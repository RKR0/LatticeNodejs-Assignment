import bcrypt from 'bcrypt'
import { uploadFile, deleteFile, getObjectSignedUrl } from '../config/S3config.js'
import conn from '../config/dataBaseConn.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const addPsychiatrist = async (req,res) => {

    let { name, email, phone_number,password,hospital_id} = req.body;
    const file = req.file
     let photo = '';

    if(!(name && email && phone_number && password  && file && hospital_id)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
        return;
    }
    if((/^[a-zA-Z ]+$/).test(name)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Name" })
        return;
    }
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Email" })
        return;
    }
    if((/^\+?\d{10,}$/).test(phone_number)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Phone Number" })
        return;
    }
    if((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).test(password)===false){
        res.status(400).send({ "status": "failed", "message": "Password must contain one upper character, one lower character and a number. Max length 15 and min length 8" })
        return;
    } 
   

    try {


      const file = req.file
        if(file!=null){
          const imageName = "email"
          await uploadFile(file.buffer, imageName, file.mimetype)
          photo = await getObjectSignedUrl(imageName)
      
    }

    let sqlforhospitaldata = `Select * from hospitals where  id =   ${hospital_id}`
    const resulthospital = await conn.query(sqlforhospitaldata);
  
     if(resulthospital[0].length===0){
       res.status(404).send({ "status": "failed", "message": "Please Enter Valid Hospital ID" })
       return;
     }
            const salt = await bcrypt.genSalt(12)
            const hashPassword = await bcrypt.hash(password, salt)

           let sql = `INSERT INTO psychiatrists (name, email, phone_number, password,photo,hospital_id) VALUES (?,?,?,?,?,?)`

          const result = await conn.query(sql,[name,email, phone_number,hashPassword,photo,hospital_id])
                res.status(201).send({"status": `Psychiatrist registered successfully with ID: ${result[0].insertId}`})
          } catch (error) {
            console.log(error)
            res.status(500).send({ "status": "failed", "message": "Unable to Register Due to InternalserverError" })
          }

  }

const getPsychiatristById = async (req,res) => {

    let psychiatristid = req.params.psychiatristid;

    if(!(psychiatristid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {

        let sql = `Select * from psychiatrists where  id =   ${psychiatristid}`
  
         const result  = await conn.query(sql)
         if(result[0].length===0){
          res.status(404).send({ "status": "failed", "message": "Please Enter Valid Psychiatrist ID" })
          return;
        }
          res.status(200).json(result[0])

            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message":"Internal Server Error" })
            }
}

const allPsychiatrists = async (req,res) => {

    try {

        let sql = `Select * from psychiatrists `
  
        const result  = await conn.query(sql)
         res.status(200).json(result[0])

            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
            }
}

const deletePsychiatrist = async (req,res) => {

    let psychiatristid = req.params.psychiatristid;

    if(!(psychiatristid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {
      let sql1 = `Select * from psychiatrists where  id =   ${psychiatristid}`
      const result  = await conn.query(sql1)
      if(result[0].length===0){
       res.status(404).send({ "status": "failed", "message": "Please Enter Valid Psychiatrist ID" })
       return;
     }
        let sql = `Delete from psychiatrists where  id =   ${psychiatristid}`
  
              await conn.query(sql)
              res.status(200).send({ "status": "sucess"})

 
          
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
            }
}




export default { addPsychiatrist,getPsychiatristById,allPsychiatrists,deletePsychiatrist};


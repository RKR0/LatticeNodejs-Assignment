import bcrypt from 'bcrypt'
import { uploadFile, deleteFile, getObjectSignedUrl } from '../config/S3config.js'
import dotenv from 'dotenv'
import conn from '../config/dataBaseConn.js'
import multer from 'multer'
dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



const patientRegistration = async (req, res) => {
    let { name, email, phone_number,password,address,psychiatrist_id} = req.body;
    const file = req.file
   let photo = '';

    if(!(name && email && phone_number && password && address && file)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }
    if((/^[a-zA-Z ]+$/).test(name)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Name" })
    }
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Email" })
    }
    if((/^\+?\d{10,}$/).test(phone_number)===false){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Phone Number" })
    }
    if((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).test(password)===false){
        res.status(400).send({ "status": "failed", "message": "Password must contain one upper character, one lower character and a number. Max length 15 and min length 8" })
    } 
    if(address.length<10){
        res.status(400).send({ "status": "failed", "message": "Please Enter Valid Address" })
    } 


    try {
      const file = req.file
        if(file!=null){
          const imageName = "email"
          await uploadFile(file.buffer, imageName, file.mimetype)
         photo = await getObjectSignedUrl(imageName)  
    }
    if(psychiatrist_id){
      let sql2 = `Select * from psychiatrists where  id =   ${psychiatrist_id}`
      const result2  = await conn.query(sql2)
      if(result2[0].length===0){
       res.status(404).send({ "status": "failed", "message": "Please Enter Valid Psychiatrist ID" })
       return;
     }
    }
    else{
      psychiatrist_id = null;
    }
            const salt = await bcrypt.genSalt(12)
            const hashPassword = await bcrypt.hash(password, salt)

           let sql = `INSERT INTO patients (name, email, phone_number, password,address,photo,psychiatrist_id) VALUES (?,?,?,?,?,?,?)`

           const result = await conn.query(sql,[name,email, phone_number,hashPassword,address,photo,psychiatrist_id])
           res.status(201).send({"status": `Patient registered successfully with ID: ${result[0].insertId}`})
          } catch (error) {
            console.log(error)
            res.status(500).send({ "status": "failed", "message": "Unable to Register Due to InternalserverError" })
          }

  }



  const getPatientById = async (req,res) => {

    let patientid = req.params.patientid;

    if(!(patientid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {

        let sql = `Select * from patients where  id =   ${patientid}`
  
        const result  = await conn.query(sql)
        if(result[0].length===0){
         res.status(404).send({ "status": "failed", "message": "Please Enter Valid Patient ID" })
         return;
       }
         res.status(200).json(result[0])
          
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message":"Internal Server Error" })
            }
}

const allPatients = async (req,res) => {

    try {

        let sql = `Select * from patients `
  
        const result  = await conn.query(sql)
         res.status(200).json(result[0])


            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
            }
}

const deletePatient = async (req,res) => {

    let patientid = req.params.patientid;

    if(!(patientid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {
      let sql1 = `Select * from patients where  id =   ${patientid}`
  
      const result  = await conn.query(sql1)
      if(result[0].length===0){
       res.status(404).send({ "status": "failed", "message": "Please Enter Valid Patient ID" })
       return;
     }

        let sql = `Delete from patients where  id =   ${patientid}`
  
        await conn.query(sql)
        res.status(200).send({ "status": "sucess"})
 
          
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
            }
}

const setPsychiatrist = async (req,res) => {

  let patientid = req.params.patientid;
  let psychiatristid = req.params.psychiatristid;

  if(!(patientid && psychiatristid)){
      res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
  }

  try {
    let sql1 = `Select * from patients where  id =   ${patientid}`
  
    const result1  = await conn.query(sql1)
    if(result1[0].length===0){
     res.status(404).send({ "status": "failed", "message": "Please Enter Valid Patient ID" })
     return;
   }
   let sql2 = `Select * from psychiatrists where  id =   ${psychiatristid}`
   const result2  = await conn.query(sql2)
   if(result2[0].length===0){
    res.status(404).send({ "status": "failed", "message": "Please Enter Valid Psychiatrist ID" })
    return;
  }


      let sql = `UPDATE patients SET psychiatrist_id  = ${psychiatristid} where  id =   ${patientid}`

      await conn.query(sql)
      res.status(200).send({ "status": "sucess"})

        
          } catch (error) {
            console.log(error)
            res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
          }
}


  export default { patientRegistration, getPatientById, allPatients,deletePatient,setPsychiatrist};
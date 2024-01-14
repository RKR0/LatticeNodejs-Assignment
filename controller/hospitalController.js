import conn from '../config/dataBaseConn.js'


const addHospital = async (req,res) => {

    let {name,address} = req.body;

    if(!(name && address)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {
      
        let sql = `INSERT INTO hospitals (name,address) VALUES (?,?)`
  
        let ans =   await conn.query(sql, [name,address])
               
        res.status(200).json({"status": `Hospital registered successfully with ID: ${ans[0].insertId}`});
  
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Unable to Register Due to InternalserverError" })
            }
}

const getHospitalById = async (req,res) => {

    let hospitalid = req.params.hospitalid;

    if(!(hospitalid)){
        res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
    }

    try {

        let sql = `Select * from hospitals where  id =   ${hospitalid}`
  
        let [hospital] =  await conn.query(sql);

          if(hospital.length===0){
            return res.status(404).json({ "status": "failed", "message": "Hospital not found" });
          }
          res.status(200).json(hospital[0]);
            } catch (error) {
              console.log(error)
              res.status(500).json({ "status": "failed", "message": "Internal Server Error" })
            }
}

const allHospitalis = async (req,res) => {

    try {

        let sql = `Select * from hospitals `
  
        let [hospital] =  await conn.query(sql);

        res.status(200).json(hospital)
            } catch (error) {
              console.log(error)
              res.status(500).send({ "status": "failed", "message": "Unable to Register Due to InternalserverError" })
            }
}

const getpsychiatrists = async (req,res) => {

  let hospitalid = req.params.hospitalid;

  if(!(hospitalid)){
      res.status(400).send({ "status": "failed", "message": "Please Fill the Required Fields" })
  }

  try {

   

      let sqlforhospitaldata = `Select * from hospitals where  id =   ${hospitalid}`
       const result  = await conn.query(sqlforhospitaldata);
        if(result[0].length===0){
          res.status(404).send({ "status": "failed", "message": "Please Enter Valid Hospital ID" })
          return;
        }
        const hospitalName = result[0][0].name;

        const psychiatristCountData = await conn.query(`SELECT COUNT(*) as count FROM psychiatrists WHERE hospital_id = ${hospitalid}`);
        const psychiatristCount = psychiatristCountData[0][0].count;
  
        let psychiatristsql = `SELECT psychiatrists.id, psychiatrists.name, COUNT(patients.id) AS patientsCount
        FROM psychiatrists
        LEFT JOIN patients ON psychiatrists.id = patients.psychiatrist_id
        WHERE psychiatrists.hospital_id = ${hospitalid}
        GROUP BY psychiatrists.id`

        const [resultpsychiatrist]  = await conn.query(psychiatristsql);

        const psychiatrists = resultpsychiatrist.map(row => ({
          "Id": row.id,
          "Name": row.name,
          "PatientsCount": row.patientsCount
      }));
      console.log(psychiatrists)
      const ans = {
        "Hospital name":hospitalName,
        "Total Psychiatrist count ":psychiatristCount,
        "Total patients count":psychiatrists.reduce((sum, curr) => sum + curr.PatientsCount, 0),
        "Psychiatrist Details":psychiatrists
      }
      res.status(200).json(ans);

  } catch (error) {
    console.log(error)
    res.status(500).send({ "status": "failed", "message": "Internal Server Error" })
  }
}



export default { addHospital,getHospitalById,allHospitalis,getpsychiatrists};
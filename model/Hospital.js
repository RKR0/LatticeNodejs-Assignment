import conn from "../config/dataBaseConn.js";



const createHospitalTable = () => {
    const createTable = `
      CREATE TABLE IF NOT EXISTS hospitals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        address VARCHAR(250) NOT NULL
      );
    `;
    try{
     conn.query(createTable)
    }catch (error) {
      console.log(error)
    }
   
}

export default createHospitalTable;

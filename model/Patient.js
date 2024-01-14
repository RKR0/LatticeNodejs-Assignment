import conn from "../config/dataBaseConn.js";



const createPatientTable = () => {
    const createTable = `
      CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(20),
        password  VARCHAR(200) NOT NULL,
        photo VARCHAR(500) NOT NULL,
        address VARCHAR(250) NOT NULL,
        psychiatrist_id INT,
        FOREIGN KEY (psychiatrist_id) REFERENCES psychiatrists(id)
      );
    `;
    try{
      conn.query(createTable)
     }catch (error) {
       console.log(error)
     }
}

export default createPatientTable;

import conn from "../config/dataBaseConn.js";



const createPsychiatristTable = () => {
    const createTable = `
      CREATE TABLE IF NOT EXISTS psychiatrists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone_number VARCHAR(20),
        password  VARCHAR(200) NOT NULL,
        photo VARCHAR(500) NOT NULL,
        hospital_id INT,
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
      );
    `;
    try{
      conn.query(createTable)
     }catch (error) {
       console.log(error)
     }
}

export default createPsychiatristTable;

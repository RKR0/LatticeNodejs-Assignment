import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import createPatientTable from './model/Patient.js';
import createHospitalTable from './model/Hospital.js';
import createPsychiatristTable from './model/Psychiatrist.js';
import HospitalRouter from './routes/HospitalRoute.js';
import PatientRouter from './routes/PatientRoute.js';
import PsychiatristRouter from './routes/PsychiatristRoute.js';
import conn from './config/dataBaseConn.js';



dotenv.config();
const app = express()
const PORT = process.env.PORT


// JSON
app.use(express.json())

// CORS Policy
app.use(cors())

//connectDB;

createHospitalTable()
createPsychiatristTable()
createPatientTable();

app.use("/api/hospital",HospitalRouter)
app.use("/api/patient",PatientRouter)
app.use("/api/psychiatrist",PsychiatristRouter)



app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );
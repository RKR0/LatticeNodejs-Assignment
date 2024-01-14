import express from 'express';
import multer from 'multer'
import patientController from '../controller/patientController.js';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const router = express.Router();

// public 
router.post('/add', upload.single('photo'), patientController.patientRegistration)
router.delete('/delete/patientid/:patientid', patientController.deletePatient)
router.get('/patientid/:patientid', patientController.getPatientById)
router.get('/', patientController.allPatients)
router.put('/patientid/:patientid/psychiatristid/:psychiatristid', patientController.setPsychiatrist)

export default router
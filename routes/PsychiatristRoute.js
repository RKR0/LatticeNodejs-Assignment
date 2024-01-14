import express from 'express';
import multer from 'multer'
import psychiatristController from '../controller/psychiatristController.js';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const router = express.Router();

// public 
router.post('/add', upload.single('photo'), psychiatristController.addPsychiatrist)
router.delete('/delete/psychiatristid/:psychiatristid', psychiatristController.deletePsychiatrist)
router.get('/psychiatristid/:psychiatristid',psychiatristController.getPsychiatristById)
router.get('/',psychiatristController.allPsychiatrists)



export default router
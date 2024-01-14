import express from 'express';
import hospitalController from '../controller/hospitalController.js';





const router = express.Router();

// public 
router.post('/add',hospitalController.addHospital)
router.get('/hospitalid/:hospitalid',hospitalController.getHospitalById)
router.get('/',hospitalController.allHospitalis)
router.get('/psychiatrists/hospitalid/:hospitalid',hospitalController.getpsychiatrists)

export default router


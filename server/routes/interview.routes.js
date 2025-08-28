import express from 'express';
import multer from 'multer';
import { parseResume } from '../controllers/interview.controller.js';

const upload = multer({dest: 'uploads/'});

const router = express.Router();

router.post('/upload', upload.single('resume'), parseResume);

export default router;
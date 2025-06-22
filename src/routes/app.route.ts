import { Router } from "express";
import { analyze, home, pensum, errorReport } from "../controllers/app.controller";

const router=Router();

router.get('/',home);
router.post('/analyze',analyze);
router.get('/pensum/:id',pensum);

router.get('/error-report', errorReport);

export default router;
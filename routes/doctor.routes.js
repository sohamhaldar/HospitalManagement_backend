import {Router} from "express";
import { getDoctors } from "../controllers/doctor.controller.js";


const router=Router();
router.route("/getDoctors").get(getDoctors);
// router.route("/addAppointment").post(AddApointment);

export default router;
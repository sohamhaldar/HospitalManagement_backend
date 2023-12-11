import { Router } from "express";
import {getAppointments,AddApointment} from "../controllers/patient.controller.js";

const router=Router();
router.route("/getAppointment").post(getAppointments);
router.route("/addAppointment").post(AddApointment);

export default router;
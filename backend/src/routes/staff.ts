import express from 'express';
import * as StaffController from '../controllers/staff';

const router = express.Router();

router.get("/", StaffController.getAuthenticatedStaff);

router.post("/createstaffaccount", StaffController.signUpStaff);

router.post("/stafflogin", StaffController.staffLogin);

router.post("/stafflogout", StaffController.staffLogout);

export default router;
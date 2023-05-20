import express from 'express';
import * as MembersController from '../controllers/members';

const router = express.Router();

router.get("/", MembersController.getAuthenticatedMember);

router.post("/creatememberaccount", MembersController.signUpMember);

router.post("/memberlogin", MembersController.memberLogin);

router.post("/memberlogout", MembersController.memberLogout);

export default router;
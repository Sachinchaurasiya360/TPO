 import  express from "express";
 import { isAutheticated } from "../middleware/isAuthenticated";
import { updateprofile } from "../controller/student.updateprofile";
 const router=express.Router()
 
 router.patch("/updateprofile",isAutheticated,updateprofile)

 export default router
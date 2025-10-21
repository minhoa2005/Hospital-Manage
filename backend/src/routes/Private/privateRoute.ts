import express from "express"
import userManage from './Admin/userManage.js'


const route = express.Router();
const adminRoute = [userManage]
route.use('/admin', ...adminRoute);
route.use('/doctor');
route.use('/nurse');
route.use('/patient')

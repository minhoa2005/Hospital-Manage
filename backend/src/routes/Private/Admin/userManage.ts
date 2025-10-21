import express from 'express'
import { verifyToken } from '../../../middleware/jwt.js';
import { checkPermission } from '../../../middleware/permission.js';
import userManageController from '../../../controller/Admin/userManageController.js';

const route = express.Router();

route.use(verifyToken);

route.get('/user-list', checkPermission(["Admin"]), userManageController.getAllUser);

export default route;
import express from 'express'
import { verifyToken } from '../../../middleware/jwt.js';
import { checkPermission } from '../../../middleware/permission.js';
import userManageController from '../../../controller/Admin/userManageController.js';

const route = express.Router();

route.use(verifyToken);

route.get('/users', checkPermission(["Admin"]), userManageController.getAllUser);
route.get('/user/:id', checkPermission(["Admin"]), userManageController.getUserDetailById);
route.patch('/user/:id/resetPass', checkPermission(["Admin"]), userManageController.resetPassword);
route.patch('/user/:id/disable', checkPermission(["Admin"]), userManageController.disableAccount);

export default route;
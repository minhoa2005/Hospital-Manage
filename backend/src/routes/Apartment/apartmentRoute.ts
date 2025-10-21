// const express = require('express');
// const apartmentDao = require('../../DAO/appartment');
// const route = express.Router();

import express from "express";
import type { Request, Response } from "express";
import apartmentDao from "../../DAO(old)/appartment.js";
const route = express.Router();

route.get('/get-all', apartmentDao.getAll);
route.get('/get-id/:id', apartmentDao.getById);
route.put('/update/:id', apartmentDao.updateDepartment)
route.get('/', (req: Request, res: Response) => res.send('Yes'))

export default route
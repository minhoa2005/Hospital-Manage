// const express = require('express');
// const route = express.Router();
// const apartmentRoute = require('./Apartment/apartmentRoute');
// const userRoute = require('./Public/userRoute');

import express from "express";
import apartmentRoute from "./Apartment/apartmentRoute.js";
import userRoute from "./Public/userRoute.js";
const route = express.Router();

route.use('/apartment', apartmentRoute);
route.use('/', userRoute);

export default route
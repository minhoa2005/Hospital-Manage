// const express = require('express');
// const { register, login, logout, auth } = require('../../DAO/user');
// const { verifyToken } = require('../../middleware/jwt');
// const route = express.Router();

import express from "express";
import userDAO from "../../DAO/user.js";
import { verifyToken } from "../../middleware/jwt.js";
const route = express.Router();

route.post('/register', userDAO.register);
route.post('/login', userDAO.login);
route.get('/logout', userDAO.logout);
route.get('/auth/me', verifyToken, userDAO.auth);

export default route
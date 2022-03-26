const express = require('express');
const router = express.Router();
const multer = require("multer");
const usersController = require('../controllers/usersController');

// ****** inicio de multer *******
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/img/products"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

//si var storage = multer.disk... se llamaria var pepe = multer.disk... entonces var upload = multer({storage:pepe})
let upload = multer({storage});

const { route } = require('express/lib/application');


router.get("/login",usersController.login);
//router.post("/login",usersController.processLogin);
router.get("/registro",usersController.registro);
router.get("/lista",usersController.listar);
router.post("/createUser", upload.single("image"),usersController.crear); /* Acción de creación.*/

module.exports =router;
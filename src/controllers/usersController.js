const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");

const productsFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const { redirect } = require("express/lib/response");


const controller = {
    
    login: (req,res)=> {
        res.render("./users/login.ejs")
    },
    registro: (req,res)=> {
        res.render("./users/registro.ejs")
    },
    listar: (req,res)=> {

        res.render("./users/listaUse.ejs", { users })
    },
    crear: (req,res)=> {
        //tambien podemos todo lo que contiene: req.body
        //si existe crear el nombre requerir file.name y si no poner un nombre por defecto
        let image = req.file ? req.file.filename : "no existe";

        let newUser = {
            id: users[users.length - 1].id + 1,            
            ... req.body,
            password : bcrypt.hashSync(req.body.password, 10),
            image
        }
        users.push(newUser)
        fs.writeFileSync(productsFilePath, JSON.stringify(users, null, " "))
    // Campo para Guardar informacion del formulario crear

    res.redirect("/users/lista") //pensar lo que vamos a redireccionar
},
usuarioSesion: (req,res)=> {
    req.session.name = req.body.name;
    const data = {
        name:req.session.name,
    }
    res.render("index", {data : req.session});
}
    

};

module.exports =  controller;
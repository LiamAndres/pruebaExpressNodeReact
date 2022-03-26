//require express
const express = require('express');
//para usar las rutas estaticas
const path = require('path');
const session = require('express-session');

const app = express();
const mainRoutes = require("./src/routes/mainRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const productsRoutes = require("./src/routes/productsRoutes");

// Preparando la constante para trabajar con POST
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Asegurando la compatibilidad con PUT y DELETE
const methodOverride = require("method-override");
//const session = require('express-session');
app.use(methodOverride("_method"));

//variable para subir a heroku || puerto 3000
const PORT = process.env.PORT || 3000;

//rutas estaticas
/* const publicPath = path.resolve(__dirname, './public'); */

app.use(express.static("public")); 

//implemetacion ejs
//ojo!!! cuidado!!! alerta!!! pasar views 
app.set("view engine", "ejs");
app.set("views", "./src/views");

//session
app.use(session({
    secret: "palabra secret",
    resave: false,
    saveUninitialized: true,
}));

//escuchar navegador al servidor express heroku || puerto 3000
app.listen( PORT, ()=> console.log(`corriendo servidor con Express en el puerto ${PORT}`) );

app.use("/",mainRoutes);
app.use("/users",usersRoutes);
app.use("/products",productsRoutes);

//prueba borrar
app.get('/productos/:idProductos', (req, res) => res.send(
    `Bienvenidos a `+req.params.idProductos
    ));

//prueba borrar
app.get('/productos/:idProductos/comentarios/:idcomentarios?',  (req, res) =>
    {
        if(req.params.idcomentarios==undefined){
        res.send( `Bienvenidos a producto: ${req.params.idProductos}`);
            }
        else{
        res.send( `Bienvenidos a producto: ${req.params.idProductos} y comentario ${req.params.idcomentarios}`);
            }
    }
);

   



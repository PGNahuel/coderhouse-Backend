// Imports
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

// Constantes de app
const app = express();
const PORT = 8080;

// Configuracion
app.use(express.json());
app.use(session(
    {
        secret:"GomezNahuel" 
        , saveUninitialized:false 
        , resave: false
        , rolling: true
        , store: MongoStore.create({
            mongoUrl: 'mongodb+srv://elnacho:adanyeva@clustercoder.tqbqmd3.mongodb.net/?retryWrites=true&w=majority'
        })
    }));

app.use(cookieParser("GomezNahuel"));

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routers
app.get("/",(req,res)=>{
    if(req.session.user){
        const user = {nombre: req.session.user}
        res.render('index',{user:user});
    }else{
        res.render('login');
    }
});

app.post("/login",(req,res)=>{
    const user = {nombre: req.body.user}
    if(req.body.user){
        req.session.user = req.body.user;
        req.session.cookie.maxAge = 10 * 60 * 1000;
        console.log(user);
        
        res.render('index',{
            user:user
        })
    }else{
        res.render('login',{msg:"no ok",error:true});
    }    
});

app.post("/logout",(req,res)=>{
    const user = {nombre:req.session.user};
    req.session.destroy();

    res.render('logout',{user})
})

// Escucha activa
app.listen(PORT,()=>{
    console.log(`Server on PORT ${PORT}`);
})

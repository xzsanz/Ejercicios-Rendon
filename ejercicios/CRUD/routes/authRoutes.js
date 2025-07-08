const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//registrar
router.post("/registro",async(req,res)=>{
    const {username,password} = req.body;
    const hashed = await bcrypt.hash(password,10);
    try {
        const user =await User.create({username,password:hashed});
        res.status(201).json({message: "Usuario creado correctamente "});

    } catch (error) {
        res.status(400).json({error:"usuario ya existe "})
    }
});

//Login metodo 
router.post("/login",async(req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({error : "Usuario no encontrado"});
    }
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
        return res.status(401).json({error : "Contraseña incorrecta"});
    }
    const token = jwt.sign({id: user._id},process.env.JWT_SECRETO, {
        expiresIn : "1h",
    });
    res.json({token});
});
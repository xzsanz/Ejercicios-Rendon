const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require ("../middleware/authMiddleware");

const router = express.Router();

//Creacion del producto (post)
router.post("/",authMiddleware, async (req,res)=>{
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

//leer productos (get)

router.get("/",async (req,res)=>{
    const product = await Product.find();
    res.json(product);
});

//leer solo uno

router.get("/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({message:"Producto no encontrado"});
    }
    res.json(product);
});

// actualizar, metodo (put)
router.put("/:id",authMiddleware,async (req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(product);
});

//eliminar (Delete)

router.delete("/:id",authMiddleware,async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({message:"Producto no encontrado"});
        }
        res.json({message : "Eliminado correctamente"});
    } catch (error) {
        res.status(400).json({message:"Error al eliminar", error});
    }
});

module.exports = router;
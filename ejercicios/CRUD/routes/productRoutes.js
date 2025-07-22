const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require ("../middleware/authMiddleware");

const router = express.Router();

//Creacion del producto (post)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body; // Recibimos la URL de la imagen
    const product = await Product.create({
      name,
      price,
      description,
      image: imageUrl, // Guardamos la URL de la imagen
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto", error });
  }
});


//leer productos (get)

router.get("/",async (req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
});

//leer solo uno

router.get("/:id",async (req,res)=>{
     try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
});

// actualizar, metodo (put)
router.put("/:id",authMiddleware,async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el producto", error });
    }
});

//eliminar (Delete)

router.delete("/:id",authMiddleware,async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar", error });
    }
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const User = require('../models/User');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Registro de usuario
router.post('/register', upload.single('image'), async (req, res) => {
  const { name, username, phone, email, password, latitude, longitude } = req.body;
  const image = req.file;

  if (!name || !username || !phone || !email || !password || !latitude || !longitude) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = new User({
      name,
      username,
      phone,
      email,
      password,
      image: image ? image.originalname : null,
      location: {
        type: 'Point', // Tipo GeoJSON
        coordinates: [parseFloat(longitude), parseFloat(latitude)] // Longitude, Latitude
      },
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({ token, username: user.username });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token, username: user.username });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener los datos de un usuario
// Obtener los datos del usuario por su username
router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Devolvemos los datos del usuario, incluyendo la ubicación
    res.json({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      image: user.image,
      location: user.location,
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar los datos de un usuario
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { name, username, phone, email, latitude, longitude } = req.body;
  const image = req.file;

  console.log('Datos recibidos:', req.body);  // Verificar los datos que llegan

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.name = name || user.name;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.email = email || user.email;

    if (image) {
      user.image = image.originalname;
    }

    // Si se envían las coordenadas, actualizamos la ubicación
    if (latitude && longitude) {
      user.location = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]  // Guardamos la ubicación en formato GeoJSON
      };
    }

    await user.save();
    res.json({ message: 'Perfil actualizado correctamente' });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});


module.exports = router;

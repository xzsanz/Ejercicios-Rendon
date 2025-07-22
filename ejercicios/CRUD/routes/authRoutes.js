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

router.post('/register', upload.single('image'), async (req, res) => {
  const { name, username, phone, email, password } = req.body;
  const image = req.file;

  if (!name || !username || !phone || !email || !password) {
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
      image: image ? image.originalname : null
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Usuario recibido:', username);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login exitoso');
    return res.json({ token, username: user.username });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password'); // sin la contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { name, username, phone, email } = req.body;
  const image = req.file;

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

    await user.save();
    res.json({ message: 'Perfil actualizado correctamente' });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;

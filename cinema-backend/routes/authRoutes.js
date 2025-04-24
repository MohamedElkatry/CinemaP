import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// بيانات المستخدمين الافتراضية (تقدر تبدلها بملف JSON لو حبيت تخزين دائم)
const users = [
  {
    id: 1,
    email: 'user1@example.com', // تأكد أن الـ email هو اللي هتستخدمه
    password: '$2a$10$R9jY5Rsz0FhkNO/02jJ5pexbUPes7g2Q0eYh91XK3a0BOdYoz.wC2', // password: 'password'
  },
];

// تسجيل الدخول
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email); // استخدم email بدل username
  if (!user) return res.status(400).json({ message: 'Email not found.' });

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return res.status(500).json({ message: 'Error checking password.' });
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password.' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  });
});

// تسجيل مستخدم جديد
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email); // استخدم email بدل username
  if (existingUser) return res.status(400).json({ message: 'Email already exists.' }); // رسائل JSON بدلاً من String

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password.' });

    const newUser = { id: users.length + 1, email, password: hashedPassword }; // استخدم email هنا
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully.' }); // إرسال الرسالة بتنسيق JSON
  });
});

export default router;

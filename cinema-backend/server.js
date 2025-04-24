import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';  // تأكد من مسار الملف

const app = express();

// تفعيل CORS للسماح بالطلبات من الواجهة الأمامية
app.use(cors({ origin: 'http://localhost:5173' })); // تأكد أن المنفذ صحيح حسب إعدادات الواجهة الأمامية

// تحويل الطلبات إلى JSON
app.use(express.json());

// نقطة البداية للسيرفر
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// تفعيل المسارات الخاصة بالمصادقة
app.use('/api/auth', authRoutes);

// تحديد رقم البورت وتشغيل السيرفر
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

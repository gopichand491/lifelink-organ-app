import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import donorRoutes from './routes/donors';
import hospitalRoutes from './routes/hospitals';
import bloodBankRoutes from './routes/bloodBanks';
import requestRoutes from './routes/requests';
import dashboardRoutes from './routes/dashboard';
import campaignRoutes from './routes/campaigns';
import articleRoutes from './routes/articles';
import notificationRoutes from './routes/notifications';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const corsOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim());

app.use(cors({
  origin: corsOrigins.includes('*') ? true : corsOrigins,
  credentials: true,
}));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'Organ Donation & Lifesaving Finder API',
    version: '1.0.0',
    status: 'live',
    docs: '/api/health',
    endpoints: {
      auth: '/api/auth',
      donors: '/api/donors',
      hospitals: '/api/hospitals',
      bloodBanks: '/api/blood-banks',
      requests: '/api/requests',
      dashboard: '/api/dashboard',
      campaigns: '/api/campaigns',
      articles: '/api/articles',
      notifications: '/api/notifications',
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/blood-banks', bloodBankRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/notifications', notificationRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`LifeLink API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;

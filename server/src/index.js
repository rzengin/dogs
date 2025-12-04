import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import petsRoutes from './routes/pets.js';
import bookingsRoutes from './routes/bookings.js';
import sittersRoutes from './routes/sitters.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Debug endpoint - Ver usuarios (TEMPORAL - REMOVER EN PRODUCCIÓN)
app.get('/api/debug/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
        res.json({
            count: users.length,
            users: users,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/sitters', sittersRoutes);

// Legacy route (keep for now)
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

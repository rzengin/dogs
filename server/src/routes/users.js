import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get current user with pets
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                name: true,
                phone: true,
                city: true,
                role: true,
                createdAt: true,
                pets: {
                    select: {
                        id: true,
                        petName: true,
                        petBreed: true,
                        petAge: true,
                        petWeight: true,
                        specialNeeds: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Error al obtener usuario actual' });
    }
});

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                name: true,
                phone: true,
                city: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        pets: true,
                        bookings: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Get user by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Users can only view their own profile unless they're admin
        if (req.userId !== parseInt(id) && req.userRole !== 'ADMIN') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                name: true,
                phone: true,
                city: true,
                role: true,
                createdAt: true,
                pets: true,
                bookings: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
});

// Update user
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Users can only update their own profile
        if (req.userId !== parseInt(id)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        const { firstName, lastName, phone, city } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                firstName,
                lastName,
                phone: phone || null,
                city: city || null,
                name: `${firstName} ${lastName}`,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                name: true,
                phone: true,
                city: true,
                role: true,
            },
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
});

// Delete user (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
});

export default router;

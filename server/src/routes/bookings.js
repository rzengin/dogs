import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's bookings
router.get('/', authMiddleware, async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                userId: req.userId
            },
            orderBy: {
                startDate: 'desc'
            }
        });

        res.json(bookings);
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ message: 'Error al obtener reservas' });
    }
});

// Create a new booking
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { startDate, endDate, sitterId, petId, serviceName, price, notes } = req.body;

        // Basic validation
        if (!startDate || !endDate || !sitterId) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const booking = await prisma.booking.create({
            data: {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                userId: req.userId,
                sitterId: parseInt(sitterId),
                petId: petId ? parseInt(petId) : null,
                serviceName: serviceName || null,
                price: price ? parseFloat(price) : null,
                notes: notes || null,
                status: 'PENDING'
            }
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ message: 'Error al crear la reserva' });
    }
});

// Update booking status
router.patch('/:id/status', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await prisma.booking.findUnique({
            where: { id: parseInt(id) }
        });

        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Only sitter or booking owner can update status
        if (booking.userId !== req.userId && booking.sitterId !== req.userId) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.json(updatedBooking);
    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({ message: 'Error al actualizar estado de reserva' });
    }
});

// Get bookings for the authenticated sitter
router.get('/sitter', authMiddleware, async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                sitterId: req.userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        city: true,
                        pets: true
                    }
                }
            },
            orderBy: {
                startDate: 'desc'
            }
        });

        res.json(bookings);
    } catch (error) {
        console.error('Get sitter bookings error:', error);
        res.status(500).json({ message: 'Error al obtener reservas del cuidador' });
    }
});

// Get unique clients for the authenticated sitter
router.get('/clients', authMiddleware, async (req, res) => {
    try {
        // Find all bookings for this sitter to get unique userIds
        const bookings = await prisma.booking.findMany({
            where: {
                sitterId: req.userId
            },
            select: {
                userId: true
            },
            distinct: ['userId']
        });

        const userIds = bookings.map(b => b.userId);

        // Fetch user details for these clients
        const clients = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                city: true,
                createdAt: true,
                pets: true,
                _count: {
                    select: { bookings: true }
                }
            }
        });

        res.json(clients);
    } catch (error) {
        console.error('Get sitter clients error:', error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
});

// Get pets of clients for the authenticated sitter
router.get('/pets', authMiddleware, async (req, res) => {
    try {
        // Find all bookings for this sitter to get unique userIds
        const bookings = await prisma.booking.findMany({
            where: {
                sitterId: req.userId
            },
            select: {
                userId: true
            },
            distinct: ['userId']
        });

        const userIds = bookings.map(b => b.userId);

        // Fetch pets owned by these users
        const pets = await prisma.pet.findMany({
            where: {
                ownerId: {
                    in: userIds
                }
            },
            include: {
                owner: {
                    select: {
                        name: true,
                        phone: true
                    }
                }
            }
        });

        res.json(pets);
    } catch (error) {
        console.error('Get sitter pets error:', error);
        res.status(500).json({ message: 'Error al obtener mascotas' });
    }
});

export default router;

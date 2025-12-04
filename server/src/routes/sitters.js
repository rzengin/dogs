import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all sitters with optional filters
router.get('/', async (req, res) => {
    try {
        const { city, service, petType, minPrice, maxPrice } = req.query;

        const sitters = await prisma.sitterProfile.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        email: true,
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                    },
                },
            },
        });

        // Filter results
        let filteredSitters = sitters;

        if (city) {
            filteredSitters = filteredSitters.filter(s => 
                s.user.city?.toLowerCase().includes(city.toLowerCase())
            );
        }

        if (service) {
            filteredSitters = filteredSitters.filter(s => {
                const services = JSON.parse(s.services || '[]');
                return services.some(srv => srv.toLowerCase().includes(service.toLowerCase()));
            });
        }

        if (petType) {
            filteredSitters = filteredSitters.filter(s => {
                const petTypes = JSON.parse(s.petTypes || '[]');
                return petTypes.some(type => type.toLowerCase().includes(petType.toLowerCase()));
            });
        }

        if (minPrice) {
            filteredSitters = filteredSitters.filter(s => s.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            filteredSitters = filteredSitters.filter(s => s.price <= parseFloat(maxPrice));
        }

        res.json(filteredSitters);
    } catch (error) {
        console.error('Get sitters error:', error);
        res.status(500).json({ message: 'Error al obtener cuidadores' });
    }
});

// Get sitter by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const sitter = await prisma.sitterProfile.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        email: true,
                        phone: true,
                    },
                },
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                    },
                },
                availability: {
                    where: {
                        date: {
                            gte: new Date(),
                        },
                    },
                    orderBy: {
                        date: 'asc',
                    },
                },
            },
        });

        if (!sitter) {
            return res.status(404).json({ message: 'Cuidador no encontrado' });
        }

        res.json(sitter);
    } catch (error) {
        console.error('Get sitter error:', error);
        res.status(500).json({ message: 'Error al obtener cuidador' });
    }
});

// Create or update sitter profile
router.post('/profile', authMiddleware, async (req, res) => {
    try {
        const {
            bio,
            price,
            location,
            neighborhood,
            experience,
            services,
            petTypes,
            propertyType,
            hasOutdoorSpace,
            allowsPets,
            maxPets,
            skills,
            certifications,
        } = req.body;

        // Check if profile already exists
        const existingProfile = await prisma.sitterProfile.findUnique({
            where: { userId: req.userId },
        });

        let profile;
        if (existingProfile) {
            // Update existing profile
            profile = await prisma.sitterProfile.update({
                where: { userId: req.userId },
                data: {
                    bio,
                    price: parseFloat(price),
                    location,
                    neighborhood: neighborhood || null,
                    experience,
                    services: JSON.stringify(services),
                    petTypes: JSON.stringify(petTypes),
                    propertyType,
                    hasOutdoorSpace: hasOutdoorSpace || false,
                    allowsPets: allowsPets || false,
                    maxPets,
                    skills: skills || null,
                    certifications: certifications || null,
                },
            });
        } else {
            // Create new profile
            profile = await prisma.sitterProfile.create({
                data: {
                    userId: req.userId,
                    bio,
                    price: parseFloat(price),
                    location,
                    neighborhood: neighborhood || null,
                    experience,
                    services: JSON.stringify(services),
                    petTypes: JSON.stringify(petTypes),
                    propertyType,
                    hasOutdoorSpace: hasOutdoorSpace || false,
                    allowsPets: allowsPets || false,
                    maxPets,
                    skills: skills || null,
                    certifications: certifications || null,
                },
            });
        }

        // Update user role to SITTER
        await prisma.user.update({
            where: { id: req.userId },
            data: { role: 'SITTER' },
        });

        res.status(201).json(profile);
    } catch (error) {
        console.error('Create/update sitter profile error:', error);
        res.status(500).json({ message: 'Error al crear/actualizar perfil de cuidador' });
    }
});

// Get sitter's availability
router.get('/:id/availability', async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate } = req.query;

        const where = {
            sitterId: parseInt(id),
        };

        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        } else {
            where.date = {
                gte: new Date(),
            };
        }

        const availability = await prisma.sitterAvailability.findMany({
            where,
            orderBy: { date: 'asc' },
        });

        res.json(availability);
    } catch (error) {
        console.error('Get availability error:', error);
        res.status(500).json({ message: 'Error al obtener disponibilidad' });
    }
});

// Update sitter's availability
router.post('/availability', authMiddleware, async (req, res) => {
    try {
        const { date, isAvailable, slots } = req.body;

        // Get sitter profile
        const sitterProfile = await prisma.sitterProfile.findUnique({
            where: { userId: req.userId },
        });

        if (!sitterProfile) {
            return res.status(404).json({ message: 'Perfil de cuidador no encontrado' });
        }

        // Upsert availability
        const availability = await prisma.sitterAvailability.upsert({
            where: {
                sitterId_date: {
                    sitterId: sitterProfile.id,
                    date: new Date(date),
                },
            },
            update: {
                isAvailable,
                slots: JSON.stringify(slots),
            },
            create: {
                sitterId: sitterProfile.id,
                date: new Date(date),
                isAvailable,
                slots: JSON.stringify(slots),
            },
        });

        res.json(availability);
    } catch (error) {
        console.error('Update availability error:', error);
        res.status(500).json({ message: 'Error al actualizar disponibilidad' });
    }
});

// Create review for sitter
router.post('/:id/reviews', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment,
                sitterId: parseInt(id),
            },
        });

        // Update sitter's average rating
        const allReviews = await prisma.review.findMany({
            where: { sitterId: parseInt(id) },
        });

        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await prisma.sitterProfile.update({
            where: { id: parseInt(id) },
            data: { rating: avgRating },
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ message: 'Error al crear reseña' });
    }
});

export default router;

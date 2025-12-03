import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's pets
router.get('/', authMiddleware, async (req, res) => {
    try {
        const pets = await prisma.pet.findMany({
            where: { ownerId: req.userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(pets);
    } catch (error) {
        console.error('Get pets error:', error);
        res.status(500).json({ message: 'Error al obtener mascotas' });
    }
});

// Create pet
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { petName, petBreed, petAge, petWeight, specialNeeds } = req.body;

        const pet = await prisma.pet.create({
            data: {
                petName,
                petBreed,
                petAge,
                petWeight: petWeight || null,
                specialNeeds: specialNeeds || null,
                ownerId: req.userId,
            },
        });

        res.status(201).json(pet);
    } catch (error) {
        console.error('Create pet error:', error);
        res.status(500).json({ message: 'Error al crear mascota' });
    }
});

// Update pet
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { petName, petBreed, petAge, petWeight, specialNeeds } = req.body;

        // Verify ownership
        const pet = await prisma.pet.findUnique({ where: { id: parseInt(id) } });
        if (!pet || pet.ownerId !== req.userId) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        const updatedPet = await prisma.pet.update({
            where: { id: parseInt(id) },
            data: {
                petName,
                petBreed,
                petAge,
                petWeight: petWeight || null,
                specialNeeds: specialNeeds || null,
            },
        });

        res.json(updatedPet);
    } catch (error) {
        console.error('Update pet error:', error);
        res.status(500).json({ message: 'Error al actualizar mascota' });
    }
});

// Delete pet
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Verify ownership
        const pet = await prisma.pet.findUnique({ where: { id: parseInt(id) } });
        if (!pet || pet.ownerId !== req.userId) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        await prisma.pet.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Mascota eliminada' });
    } catch (error) {
        console.error('Delete pet error:', error);
        res.status(500).json({ message: 'Error al eliminar mascota' });
    }
});

export default router;

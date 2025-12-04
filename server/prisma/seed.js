import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Check if data already exists
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
        console.log('⚠️  Database already has data. Skipping seed.');
        console.log(`Found ${existingUsers} users in database.`);
        return;
    }

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create regular users
    const user1 = await prisma.user.upsert({
        where: { email: 'juan@example.com' },
        update: {},
        create: {
            email: 'juan@example.com',
            password: hashedPassword,
            firstName: 'Juan',
            lastName: 'Pérez',
            name: 'Juan Pérez',
            phone: '099123456',
            city: 'Montevideo',
            role: 'USER',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'maria@example.com' },
        update: {},
        create: {
            email: 'maria@example.com',
            password: hashedPassword,
            firstName: 'María',
            lastName: 'González',
            name: 'María González',
            phone: '099234567',
            city: 'Montevideo',
            role: 'SITTER',
        },
    });

    const user3 = await prisma.user.upsert({
        where: { email: 'carlos@example.com' },
        update: {},
        create: {
            email: 'carlos@example.com',
            password: hashedPassword,
            firstName: 'Carlos',
            lastName: 'Rodríguez',
            name: 'Carlos Rodríguez',
            phone: '099345678',
            city: 'Montevideo',
            role: 'SITTER',
        },
    });

    const user4 = await prisma.user.upsert({
        where: { email: 'ana@example.com' },
        update: {},
        create: {
            email: 'ana@example.com',
            password: hashedPassword,
            firstName: 'Ana',
            lastName: 'Martínez',
            name: 'Ana Martínez',
            phone: '099456789',
            city: 'Maldonado',
            role: 'SITTER',
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            name: 'Admin User',
            phone: '099999999',
            city: 'Montevideo',
            role: 'ADMIN',
        },
    });

    console.log('✅ Users created');

    // Create sitter profiles
    const sitter1 = await prisma.sitterProfile.upsert({
        where: { userId: user2.id },
        update: {},
        create: {
            userId: user2.id,
            bio: 'Amante de los animales con más de 5 años de experiencia cuidando perros de todos los tamaños. Tengo un patio grande y mucho tiempo para dedicarles.',
            price: 400,
            location: 'Montevideo',
            neighborhood: 'Pocitos',
            experience: '5+',
            services: JSON.stringify(['Paseo de Perros', 'Cuidado en Casa', 'Hotel para Mascotas']),
            petTypes: JSON.stringify(['Perros Pequeños', 'Perros Medianos', 'Perros Grandes']),
            propertyType: 'Casa con Patio',
            hasOutdoorSpace: true,
            allowsPets: true,
            maxPets: '3',
            skills: 'Primeros auxilios, administración de medicamentos',
            certifications: 'Certificado de cuidado canino',
            rating: 4.9,
        },
    });

    const sitter2 = await prisma.sitterProfile.upsert({
        where: { userId: user3.id },
        update: {},
        create: {
            userId: user3.id,
            bio: 'Veterinario con experiencia en cuidado de mascotas. Ofrezco servicios profesionales y cariñosos para tu mejor amigo.',
            price: 500,
            location: 'Montevideo',
            neighborhood: 'Carrasco',
            experience: '5+',
            services: JSON.stringify(['Cuidado en Casa', 'Hotel para Mascotas', 'Guardería Canina']),
            petTypes: JSON.stringify(['Perros Pequeños', 'Perros Medianos', 'Perros Grandes', 'Gatos']),
            propertyType: 'Casa',
            hasOutdoorSpace: true,
            allowsPets: false,
            maxPets: '2',
            skills: 'Veterinaria, primeros auxilios, entrenamiento básico',
            certifications: 'Título de veterinario',
            rating: 5.0,
        },
    });

    const sitter3 = await prisma.sitterProfile.upsert({
        where: { userId: user4.id },
        update: {},
        create: {
            userId: user4.id,
            bio: 'Vivo en Punta del Este y me encanta pasear perros por la playa. Perfecto para vacaciones de tu mascota.',
            price: 450,
            location: 'Maldonado',
            neighborhood: 'Punta del Este',
            experience: '3-5',
            services: JSON.stringify(['Paseo de Perros', 'Hotel para Mascotas']),
            petTypes: JSON.stringify(['Perros Pequeños', 'Perros Medianos']),
            propertyType: 'Casa con Patio',
            hasOutdoorSpace: true,
            allowsPets: true,
            maxPets: '2',
            skills: 'Paseos largos, juegos en la playa',
            certifications: null,
            rating: 4.8,
        },
    });

    console.log('✅ Sitter profiles created');

    // Create pets for user1
    const pet1 = await prisma.pet.create({
        data: {
            petName: 'Max',
            petBreed: 'Labrador',
            petAge: '3 años',
            petWeight: '30kg',
            specialNeeds: null,
            ownerId: user1.id,
        },
    });

    const pet2 = await prisma.pet.create({
        data: {
            petName: 'Luna',
            petBreed: 'Golden Retriever',
            petAge: '2 años',
            petWeight: '25kg',
            specialNeeds: 'Necesita medicación diaria',
            ownerId: user1.id,
        },
    });

    console.log('✅ Pets created');

    // Create bookings
    const booking1 = await prisma.booking.create({
        data: {
            startDate: new Date('2024-12-10'),
            endDate: new Date('2024-12-15'),
            status: 'CONFIRMED',
            userId: user1.id,
            sitterId: user2.id,
            petId: pet1.id,
            serviceName: 'Hotel para Mascotas',
            price: 2000,
            notes: 'Max es muy juguetón y le encanta correr',
        },
    });

    const booking2 = await prisma.booking.create({
        data: {
            startDate: new Date('2024-12-20'),
            endDate: new Date('2024-12-25'),
            status: 'PENDING',
            userId: user1.id,
            sitterId: user3.id,
            petId: pet2.id,
            serviceName: 'Cuidado en Casa',
            price: 2500,
            notes: 'Luna necesita su medicación a las 8am y 8pm',
        },
    });

    console.log('✅ Bookings created');

    // Create reviews
    const review1 = await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Excelente cuidadora! María trató a Max como si fuera su propio perro. Muy recomendable.',
            sitterId: sitter1.id,
        },
    });

    const review2 = await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Carlos es un profesional increíble. Me dio mucha tranquilidad saber que Luna estaba en buenas manos.',
            sitterId: sitter2.id,
        },
    });

    console.log('✅ Reviews created');

    // Create availability for sitters (next 30 days)
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);

        await prisma.sitterAvailability.create({
            data: {
                sitterId: sitter1.id,
                date: date,
                isAvailable: i % 7 !== 0, // Not available on Sundays
                slots: JSON.stringify(['morning', 'afternoon', 'evening', 'overnight']),
            },
        });

        await prisma.sitterAvailability.create({
            data: {
                sitterId: sitter2.id,
                date: date,
                isAvailable: true,
                slots: JSON.stringify(['morning', 'afternoon', 'evening', 'overnight']),
            },
        });
    }

    console.log('✅ Availability created');

    console.log('🎉 Seeding completed!');
    console.log('\n📝 Test credentials:');
    console.log('User: juan@example.com / password123');
    console.log('Sitter: maria@example.com / password123');
    console.log('Sitter: carlos@example.com / password123');
    console.log('Admin: admin@example.com / password123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

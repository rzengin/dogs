import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyDeployment() {
    console.log('🔍 Verificando despliegue...\n');

    try {
        // Check database connection
        await prisma.$connect();
        console.log('✅ Conexión a base de datos: OK');

        // Check users
        const userCount = await prisma.user.count();
        console.log(`✅ Usuarios en BD: ${userCount}`);

        // Check sitters
        const sitterCount = await prisma.sitterProfile.count();
        console.log(`✅ Perfiles de cuidadores: ${sitterCount}`);

        // Check pets
        const petCount = await prisma.pet.count();
        console.log(`✅ Mascotas: ${petCount}`);

        // Check bookings
        const bookingCount = await prisma.booking.count();
        console.log(`✅ Reservas: ${bookingCount}`);

        // Check availability
        const availabilityCount = await prisma.sitterAvailability.count();
        console.log(`✅ Registros de disponibilidad: ${availabilityCount}`);

        console.log('\n🎉 Despliegue verificado correctamente!');

        if (userCount === 0) {
            console.log('\n⚠️  ADVERTENCIA: No hay usuarios en la base de datos.');
            console.log('   Ejecuta: npm run seed');
        }

    } catch (error) {
        console.error('❌ Error en verificación:', error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

verifyDeployment();

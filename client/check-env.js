// Script para verificar variables de entorno antes del build
console.log('🔍 Verificando variables de entorno...');
console.log('VITE_API_URL:', process.env.VITE_API_URL || '❌ NO DEFINIDA');

if (!process.env.VITE_API_URL) {
  console.error('⚠️  ADVERTENCIA: VITE_API_URL no está definida');
  console.error('⚠️  El cliente usará el valor por defecto: http://localhost:3000');
} else {
  console.log('✅ VITE_API_URL configurada correctamente');
}

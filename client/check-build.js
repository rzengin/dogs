// Script para verificar qué VITE_API_URL se embebió en el build
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist', 'assets');

if (!fs.existsSync(distPath)) {
  console.log('❌ No existe la carpeta dist/assets. Ejecuta: npm run build');
  process.exit(1);
}

const files = fs.readdirSync(distPath);
const jsFiles = files.filter(f => f.endsWith('.js'));

console.log('🔍 Buscando VITE_API_URL en los archivos compilados...\n');

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(distPath, file), 'utf8');
  
  // Buscar referencias a localhost o railway
  if (content.includes('localhost:3000')) {
    console.log(`⚠️  ${file}: Contiene "localhost:3000"`);
  }
  if (content.includes('railway.app')) {
    console.log(`✅ ${file}: Contiene "railway.app"`);
  }
  if (content.includes('server-production-d03a')) {
    console.log(`✅ ${file}: Contiene "server-production-d03a"`);
  }
});

console.log('\n💡 Si ves "localhost:3000", el build no tiene la variable correcta.');
console.log('💡 Deberías ver "server-production-d03a.up.railway.app"');

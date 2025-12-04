# 📋 Resumen de Configuración para Railway

## ✅ Cambios Realizados

### 1. Base de Datos
- ✅ Schema de Prisma actualizado a PostgreSQL
- ✅ Migraciones configuradas para deploy automático
- ✅ Seed configurado para ejecutarse automáticamente

### 2. Scripts de Deploy
- ✅ `npm run build` - Genera Prisma Client
- ✅ `npm run deploy` - Ejecuta migraciones + seed
- ✅ `npm run seed` - Puebla la BD con datos de ejemplo
- ✅ `npm run verify` - Verifica el despliegue

### 3. Configuración de Railway

#### Archivo `server/railway.json`
```json
{
  "build": {
    "buildCommand": "npm install && npx prisma generate"
  },
  "deploy": {
    "startCommand": "npx prisma migrate deploy && node prisma/seed.js && node src/index.js"
  }
}
```

#### Variables de Entorno Necesarias

**Servidor:**
```env
DATABASE_URL=<automático-de-railway>
JWT_SECRET=<tu-clave-secreta>
NODE_ENV=production
PORT=3000
```

**Cliente:**
```env
VITE_API_URL=https://tu-servidor.up.railway.app
```

### 4. Seed Inteligente

El seed ahora:
- ✅ Verifica si ya existen datos
- ✅ Si hay datos, NO hace nada (evita duplicados)
- ✅ Si está vacía, crea todos los datos de ejemplo
- ✅ Muestra mensajes claros en los logs

### 5. Datos que se Crean Automáticamente

Cuando la BD está vacía, se crean:

**Usuarios (5):**
- juan@example.com - Usuario regular
- maria@example.com - Cuidadora (Pocitos, Montevideo)
- carlos@example.com - Cuidador (Carrasco, Montevideo)
- ana@example.com - Cuidadora (Punta del Este)
- admin@example.com - Administrador

**Perfiles de Cuidadores (3):**
- María: $400/día, 5+ años exp, rating 4.9
- Carlos: $500/día, 5+ años exp, rating 5.0
- Ana: $450/día, 3-5 años exp, rating 4.8

**Mascotas (2):**
- Max - Labrador de Juan
- Luna - Golden Retriever de Juan

**Reservas (2):**
- Juan → María (10-15 Dic, CONFIRMED)
- Juan → Carlos (20-25 Dic, PENDING)

**Reseñas (2):**
- María: 5 estrellas
- Carlos: 5 estrellas

**Disponibilidad:**
- 30 días para cada cuidador

**Contraseña para todos:** `password123`

## 🚀 Flujo de Despliegue

```
git push
    ↓
Railway detecta cambio
    ↓
npm install
    ↓
npx prisma generate
    ↓
npx prisma migrate deploy
    ↓
node prisma/seed.js (si BD vacía)
    ↓
node src/index.js
    ↓
✅ Servidor corriendo con datos!
```

## 🔍 Verificar Despliegue

### Desde Railway Dashboard
1. Ve a tu servicio → "Deployments"
2. Busca estos mensajes en los logs:

```
🌱 Seeding database...
✅ Users created
✅ Sitter profiles created
✅ Pets created
✅ Bookings created
✅ Reviews created
✅ Availability created
🎉 Seeding completed!
Server running on port 3000
```

### Desde Terminal
```bash
# Verificar salud del servidor
curl https://tu-servidor.up.railway.app/api/health

# Verificar cuidadores
curl https://tu-servidor.up.railway.app/api/sitters

# Verificar con Railway CLI
railway run npm run verify
```

## 📝 Checklist Pre-Deploy

Antes de hacer push:

- [ ] PostgreSQL agregado en Railway
- [ ] `JWT_SECRET` configurado en servidor
- [ ] `VITE_API_URL` configurado en cliente
- [ ] Root directories configurados:
  - [ ] Servidor: `server`
  - [ ] Cliente: `client`
- [ ] Build commands configurados
- [ ] Start commands configurados
- [ ] Código testeado localmente

## 🐛 Troubleshooting

### "Database already has data. Skipping seed."
✅ **Normal!** El seed detectó datos existentes y no hizo nada.

### "Environment variable not found: DATABASE_URL"
❌ **Problema:** PostgreSQL no está conectado.
**Solución:** Agrega PostgreSQL al proyecto en Railway.

### Seed no se ejecuta
❌ **Problema:** Start command incorrecto.
**Solución:** Verifica que el start command incluye:
```bash
npx prisma migrate deploy && node prisma/seed.js && node src/index.js
```

### Migraciones fallan
❌ **Problema:** Schema no coincide con BD.
**Solución:** 
1. Resetea la BD en Railway (Data → Query → DROP SCHEMA)
2. Redeploy el servicio

## 🎯 Próximos Pasos

Después del primer deploy exitoso:

1. ✅ Verifica que el servidor responde
2. ✅ Verifica que los datos se crearon
3. ✅ Prueba login con credenciales de ejemplo
4. ✅ Configura dominio personalizado (opcional)
5. ✅ Configura monitoreo (opcional)

## 📚 Documentación Adicional

- `DEPLOY_RAILWAY_QUICK.md` - Guía rápida
- `RAILWAY_DEPLOYMENT.md` - Guía completa
- `README_ES.md` - Documentación general

---

**¡Todo listo para deploy automático! 🚀**

Cada `git push` desplegará tu aplicación con datos de ejemplo incluidos.

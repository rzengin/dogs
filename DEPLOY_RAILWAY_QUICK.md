# 🚀 Despliegue Rápido en Railway

## ⚡ En 5 Minutos

### 1️⃣ Crear Proyecto en Railway
1. Ve a https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio

### 2️⃣ Agregar PostgreSQL
1. En el proyecto, clic en "+ New"
2. "Database" → "Add PostgreSQL"
3. ✅ Listo! `DATABASE_URL` se configura automáticamente

### 3️⃣ Configurar Servidor

**Variables de Entorno:**
```env
JWT_SECRET=cambia-esto-por-algo-super-seguro-y-aleatorio
NODE_ENV=production
```

**Settings → Deploy:**
- Root Directory: `server`
- Build Command: `npm install && npx prisma generate`
- Start Command: `npx prisma migrate deploy && node prisma/seed.js && node src/index.js`

### 4️⃣ Configurar Cliente

**Variables de Entorno:**
```env
VITE_API_URL=https://TU-SERVIDOR-URL.up.railway.app
```
(Reemplaza con la URL real de tu servidor)

**Settings → Deploy:**
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Start Command: `npm run preview`

### 5️⃣ Deploy!
```bash
git add .
git commit -m "Configure for Railway deployment"
git push
```

## ✅ Verificar

```bash
# Verificar servidor
curl https://tu-servidor.up.railway.app/api/health

# Verificar datos
curl https://tu-servidor.up.railway.app/api/sitters
```

## 🎉 ¡Listo!

**Credenciales de prueba:**
- juan@example.com / password123
- maria@example.com / password123
- admin@example.com / password123

## 📚 Más Información

Ver `RAILWAY_DEPLOYMENT.md` para guía completa.

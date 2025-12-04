# 🚂 Guía de Despliegue en Railway

## 📋 Requisitos Previos

1. Cuenta en [Railway.app](https://railway.app)
2. Repositorio en GitHub con el código
3. PostgreSQL database en Railway

## 🚀 Pasos para Desplegar

### 1. Crear Proyecto en Railway

1. Ve a [Railway.app](https://railway.app)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway a acceder a tu repositorio
5. Selecciona el repositorio de Mascotas Uruguay

### 2. Configurar Base de Datos PostgreSQL

1. En tu proyecto de Railway, haz clic en "+ New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente la base de datos
4. La variable `DATABASE_URL` se configurará automáticamente

### 3. Configurar Variables de Entorno del Servidor

En el servicio del **servidor**, agrega estas variables:

```env
JWT_SECRET=tu-clave-secreta-super-segura-cambiala-en-produccion
PORT=3000
NODE_ENV=production
```

**Importante:** Railway ya proporciona `DATABASE_URL` automáticamente cuando conectas PostgreSQL.

### 4. Configurar el Servicio del Servidor

1. Ve a la configuración del servicio del servidor
2. En "Settings" → "Deploy":
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npx prisma migrate deploy && node prisma/seed.js && node src/index.js`

### 5. Configurar Variables de Entorno del Cliente

En el servicio del **cliente**, agrega:

```env
VITE_API_URL=https://tu-servidor-url.up.railway.app
```

Reemplaza `tu-servidor-url` con la URL real de tu servicio de servidor en Railway.

### 6. Configurar el Servicio del Cliente

1. Ve a la configuración del servicio del cliente
2. En "Settings" → "Deploy":
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`

## 🔄 Proceso de Despliegue Automático

Cada vez que hagas `git push` a GitHub:

1. ✅ Railway detecta el cambio
2. ✅ Instala dependencias (`npm install`)
3. ✅ Genera Prisma Client (`npx prisma generate`)
4. ✅ Ejecuta migraciones (`npx prisma migrate deploy`)
5. ✅ Ejecuta seed si la BD está vacía (`node prisma/seed.js`)
6. ✅ Inicia el servidor (`node src/index.js`)

## 🌱 Seed Automático

El script de seed está configurado para:
- ✅ Verificar si ya existen datos en la base de datos
- ✅ Si hay datos, **no hace nada** (evita duplicados)
- ✅ Si está vacía, crea los datos de ejemplo

### Datos que se Crean Automáticamente

- **5 usuarios**:
  - juan@example.com (Usuario regular)
  - maria@example.com (Cuidadora)
  - carlos@example.com (Cuidador)
  - ana@example.com (Cuidadora)
  - admin@example.com (Administrador)
- **3 perfiles de cuidadores** completos
- **2 mascotas** (Max y Luna)
- **2 reservas** de ejemplo
- **2 reseñas**
- **30 días de disponibilidad** para cada cuidador

**Contraseña para todos:** `password123`

## 🔍 Verificar el Despliegue

### 1. Verificar que el Servidor Está Corriendo

```bash
curl https://tu-servidor-url.up.railway.app/api/health
```

Deberías ver:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Verificar que los Datos se Crearon

```bash
curl https://tu-servidor-url.up.railway.app/api/sitters
```

Deberías ver una lista de cuidadores.

### 3. Verificar el Cliente

Abre `https://tu-cliente-url.up.railway.app` en tu navegador.

## 🐛 Solución de Problemas

### Error: "DATABASE_URL not found"

**Solución:**
1. Asegúrate de tener PostgreSQL agregado al proyecto
2. Verifica que el servicio del servidor esté conectado a la base de datos
3. En Railway, ve a tu servicio → "Variables" y verifica que `DATABASE_URL` existe

### Error: "Prisma Client not generated"

**Solución:**
Actualiza el Build Command a:
```bash
npm install && npx prisma generate
```

### El Seed No Se Ejecuta

**Solución:**
1. Verifica los logs en Railway
2. Asegúrate de que el Start Command incluye el seed:
```bash
npx prisma migrate deploy && node prisma/seed.js && node src/index.js
```

### Migraciones Fallan

**Solución:**
1. Verifica que `DATABASE_URL` está configurada
2. Revisa los logs de Railway para ver el error específico
3. Si necesitas resetear la BD:
   - Ve a PostgreSQL en Railway
   - Haz clic en "Data" → "Query"
   - Ejecuta: `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
   - Redeploy el servicio

### El Cliente No Puede Conectarse al Servidor

**Solución:**
1. Verifica que `VITE_API_URL` en el cliente apunta a la URL correcta del servidor
2. Asegúrate de que el servidor tiene CORS configurado (ya está en el código)
3. Verifica que ambos servicios están corriendo

## 📊 Monitoreo

### Ver Logs en Tiempo Real

1. Ve a tu servicio en Railway
2. Haz clic en "Deployments"
3. Selecciona el deployment activo
4. Verás los logs en tiempo real

### Logs Importantes a Buscar

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

## 🔐 Seguridad en Producción

### Variables de Entorno Críticas

1. **JWT_SECRET**: Usa un string largo y aleatorio
   ```bash
   # Genera uno con:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **DATABASE_URL**: Railway lo maneja automáticamente

### Recomendaciones

- ✅ Cambia `JWT_SECRET` a un valor único y seguro
- ✅ No compartas las credenciales de producción
- ✅ Usa variables de entorno para todos los secretos
- ✅ Habilita HTTPS (Railway lo hace automáticamente)

## 🔄 Actualizar Datos de Producción

Si necesitas actualizar los datos de ejemplo en producción:

### Opción 1: Resetear y Re-seed

```bash
# Conectarse a Railway CLI
railway login
railway link

# Ejecutar seed manualmente
railway run node server/prisma/seed.js
```

### Opción 2: Desde Railway Dashboard

1. Ve a PostgreSQL → "Data" → "Query"
2. Ejecuta queries SQL directamente

### Opción 3: Usar Prisma Studio

```bash
# Conectarse a la BD de producción
railway login
railway link
cd server
npx prisma studio
```

## 📝 Checklist de Despliegue

Antes de hacer push a producción:

- [ ] PostgreSQL database creada en Railway
- [ ] Variables de entorno configuradas (JWT_SECRET)
- [ ] Root directory configurado para cada servicio
- [ ] Build commands correctos
- [ ] Start commands incluyen migraciones y seed
- [ ] VITE_API_URL del cliente apunta al servidor correcto
- [ ] Código testeado localmente
- [ ] Migraciones probadas

## 🎉 ¡Listo!

Una vez configurado, cada `git push` desplegará automáticamente:
- ✅ Servidor con BD PostgreSQL
- ✅ Datos de ejemplo (si la BD está vacía)
- ✅ Cliente conectado al servidor

**URLs de Ejemplo:**
- Servidor: `https://mascotas-uruguay-server.up.railway.app`
- Cliente: `https://mascotas-uruguay-client.up.railway.app`

---

**¿Problemas?** Revisa los logs en Railway o consulta la documentación oficial: https://docs.railway.app

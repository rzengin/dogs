# 🔧 Variables de Entorno para Railway

## 📦 Servicio: SERVER

### Variables Requeridas

```env
# JWT Secret - IMPORTANTE: Cambia esto!
JWT_SECRET=tu-clave-super-secreta-y-aleatoria-aqui

# Node Environment
NODE_ENV=production

# Puerto (opcional, Railway lo asigna automáticamente)
PORT=3000
```

### Variables Automáticas (No tocar)

```env
# Railway proporciona esto automáticamente al conectar PostgreSQL
DATABASE_URL=postgresql://...
```

### Cómo Generar JWT_SECRET Seguro

**Opción 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Opción 2 - OpenSSL:**
```bash
openssl rand -hex 32
```

**Opción 3 - Online:**
https://generate-secret.vercel.app/32

---

## 🎨 Servicio: CLIENT

### Variables Requeridas

```env
# URL del servidor - Reemplaza con tu URL real de Railway
VITE_API_URL=https://mascotas-uruguay-server.up.railway.app
```

**⚠️ IMPORTANTE:** 
- Reemplaza `mascotas-uruguay-server` con el nombre real de tu servicio
- Copia la URL exacta desde Railway Dashboard
- NO incluyas `/` al final

### Cómo Obtener la URL del Servidor

1. Ve a tu proyecto en Railway
2. Haz clic en el servicio del **servidor**
3. Ve a "Settings" → "Networking"
4. Copia la URL pública (ej: `https://tu-app.up.railway.app`)
5. Pégala en `VITE_API_URL` del cliente

---

## 📋 Configuración Paso a Paso

### 1. Configurar Servidor

1. En Railway, selecciona el servicio del **servidor**
2. Ve a "Variables"
3. Haz clic en "+ New Variable"
4. Agrega cada variable:

```
Variable Name: JWT_SECRET
Value: [pega tu clave generada]

Variable Name: NODE_ENV
Value: production
```

### 2. Configurar Cliente

1. En Railway, selecciona el servicio del **cliente**
2. Ve a "Variables"
3. Haz clic en "+ New Variable"
4. Agrega:

```
Variable Name: VITE_API_URL
Value: https://[tu-servidor].up.railway.app
```

---

## ✅ Verificación

### Verificar Variables del Servidor

```bash
# Usando Railway CLI
railway variables

# O en Dashboard
Servicio → Variables → Ver todas
```

Deberías ver:
- ✅ `DATABASE_URL` (automático)
- ✅ `JWT_SECRET` (tu valor)
- ✅ `NODE_ENV=production`

### Verificar Variables del Cliente

Deberías ver:
- ✅ `VITE_API_URL` (apuntando a tu servidor)

---

## 🔒 Seguridad

### ✅ Hacer

- ✅ Usa un JWT_SECRET único y aleatorio
- ✅ Nunca compartas JWT_SECRET públicamente
- ✅ Usa valores diferentes para dev y producción
- ✅ Guarda las credenciales en un gestor de contraseñas

### ❌ No Hacer

- ❌ No uses "secret" o "password" como JWT_SECRET
- ❌ No subas archivos .env a GitHub
- ❌ No reutilices el mismo secret en múltiples proyectos
- ❌ No compartas las variables en screenshots

---

## 🔄 Actualizar Variables

Si necesitas cambiar una variable:

1. Ve al servicio en Railway
2. "Variables" → Encuentra la variable
3. Haz clic en "Edit"
4. Cambia el valor
5. Guarda
6. **El servicio se redesplegará automáticamente**

---

## 📝 Template de Variables

### Para Copiar y Pegar

**Servidor:**
```env
JWT_SECRET=GENERA_UNO_NUEVO_AQUI
NODE_ENV=production
```

**Cliente:**
```env
VITE_API_URL=https://TU-SERVIDOR-AQUI.up.railway.app
```

---

## 🆘 Problemas Comunes

### "Cannot connect to database"
**Causa:** `DATABASE_URL` no está configurada
**Solución:** Agrega PostgreSQL al proyecto

### "Invalid token"
**Causa:** `JWT_SECRET` no coincide o no está configurada
**Solución:** Verifica que `JWT_SECRET` está en las variables

### "CORS error"
**Causa:** `VITE_API_URL` incorrecta en el cliente
**Solución:** Verifica que la URL del servidor es correcta

### "Cannot find module"
**Causa:** Variables no se aplicaron
**Solución:** Redeploy el servicio manualmente

---

## 🎯 Resumen Rápido

1. **Servidor necesita:**
   - `JWT_SECRET` (genera uno nuevo)
   - `NODE_ENV=production`
   - `DATABASE_URL` (automático con PostgreSQL)

2. **Cliente necesita:**
   - `VITE_API_URL` (URL del servidor)

3. **Después de configurar:**
   - Redeploy ambos servicios
   - Verifica que funcionan

---

**¿Listo?** Continúa con `DEPLOY_RAILWAY_QUICK.md` para el despliegue completo.

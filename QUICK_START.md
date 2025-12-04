# 🚀 Inicio Rápido - Mascotas Uruguay

## ⚡ En 3 Pasos

### 1️⃣ Iniciar Backend (Terminal 1)
```bash
cd server
npm run dev
```
✅ Servidor corriendo en http://localhost:3000

### 2️⃣ Iniciar Frontend (Terminal 2)
```bash
cd client
npm run dev
```
✅ Aplicación corriendo en http://localhost:5173

### 3️⃣ Probar la Aplicación

Abre http://localhost:5173 en tu navegador

## 🔑 Credenciales de Prueba

```
Usuario Regular:
📧 juan@example.com
🔒 password123

Cuidador (María):
📧 maria@example.com
🔒 password123

Cuidador (Carlos):
📧 carlos@example.com
🔒 password123

Administrador:
📧 admin@example.com
🔒 password123
```

## 🎯 Qué Probar

### Como Usuario Regular (juan@example.com)
1. ✅ Ver tu perfil en `/profile`
2. ✅ Ver calendario con tus reservas
3. ✅ Buscar cuidadores en `/search`
4. ✅ Aplicar filtros de búsqueda
5. ✅ Ver perfil de cuidador

### Como Cuidador (maria@example.com)
1. ✅ Ir a `/sitter-dashboard`
2. ✅ Ver calendario con reservas
3. ✅ Hacer clic en días para gestionar disponibilidad
4. ✅ Confirmar/rechazar reservas pendientes
5. ✅ Ver lista de clientes y mascotas

### Como Nuevo Usuario
1. ✅ Ir a `/become-sitter`
2. ✅ Completar formulario para ser cuidador
3. ✅ Sistema crea cuenta automáticamente
4. ✅ Acceder al dashboard de cuidador

### Como Usuario Existente que Quiere Ser Cuidador
1. ✅ Login con juan@example.com
2. ✅ Ir a `/become-sitter`
3. ✅ Datos personales ya están pre-llenados
4. ✅ Solo completar información de cuidador
5. ✅ Sistema actualiza rol a SITTER

## 📱 Páginas Principales

| Ruta | Descripción | Requiere Login |
|------|-------------|----------------|
| `/` | Página de inicio | No |
| `/search` | Buscar cuidadores | No |
| `/login` | Iniciar sesión | No |
| `/signup` | Registrarse | No |
| `/become-sitter` | Ser cuidador | No* |
| `/profile` | Mi perfil | Sí |
| `/sitter-dashboard` | Dashboard cuidador | Sí (SITTER) |
| `/admin` | Panel admin | Sí (ADMIN) |

*Puede crear cuenta en el mismo formulario

## 🎨 Características del Calendario

### Colores de Reservas
- 🟠 **Naranja** = Pendiente
- 🟢 **Verde** = Confirmada
- 🔵 **Azul** = Completada
- 🔴 **Rojo** = Cancelada

### Interacciones
- **Usuarios**: Solo ven sus reservas
- **Cuidadores**: Pueden hacer clic en días para gestionar disponibilidad

## 🔍 Filtros de Búsqueda

En `/search` puedes filtrar por:
- 🏙️ **Ciudad**: Montevideo, Maldonado, etc.
- 🐕 **Servicio**: Paseo, Hotel, Guardería, etc.
- 🐾 **Tipo de Mascota**: Pequeños, Medianos, Grandes, Gatos
- 💰 **Precio**: Rango mínimo y máximo

## 📊 Datos de Prueba Incluidos

- ✅ 5 usuarios (1 regular, 3 cuidadores, 1 admin)
- ✅ 3 perfiles de cuidadores completos
- ✅ 2 mascotas (Max y Luna)
- ✅ 2 reservas de ejemplo
- ✅ 2 reseñas
- ✅ 30 días de disponibilidad

## 🛠️ Comandos Útiles

### Backend
```bash
cd server

# Iniciar servidor
npm run dev

# Regenerar base de datos
npx prisma migrate reset

# Cargar datos de prueba
npm run seed

# Ver base de datos
npx prisma studio
```

### Frontend
```bash
cd client

# Iniciar aplicación
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
cd server
rm -rf node_modules
npm install
npx prisma generate
npm run dev
```

### El cliente no inicia
```bash
cd client
rm -rf node_modules
npm install
npm run dev
```

### Base de datos vacía
```bash
cd server
npm run seed
```

### Error de CORS
Verificar que:
1. Backend esté en puerto 3000
2. Frontend tenga archivo `.env` con `VITE_API_URL=http://localhost:3000`

## 📚 Más Información

- `README_ES.md` - Documentación completa en español
- `IMPLEMENTATION_GUIDE.md` - Guía de implementación detallada
- `RESUMEN_IMPLEMENTACION.md` - Resumen ejecutivo
- `API_SETUP.md` - Configuración de API

## 💡 Tips

1. **Usa Prisma Studio** para ver la base de datos:
   ```bash
   cd server
   npx prisma studio
   ```

2. **Revisa los logs** del servidor para ver las peticiones API

3. **Usa las DevTools** del navegador para ver el estado de React

4. **Prueba diferentes roles** para ver todas las funcionalidades

## ✨ Funcionalidades Destacadas

### 🎯 Para Usuarios
- Calendario visual de reservas
- Búsqueda avanzada de cuidadores
- Gestión de mascotas
- Sistema de reseñas

### 🎯 Para Cuidadores
- Dashboard completo
- Gestión de disponibilidad con calendario
- Confirmar/rechazar reservas
- Ver clientes y mascotas

### 🎯 Sistema
- Autenticación JWT
- Roles de usuario
- API RESTful completa
- Base de datos con Prisma

## 🎉 ¡Listo!

Ahora tienes todo funcionando. Explora la aplicación y prueba todas las funcionalidades.

**¿Preguntas?** Revisa la documentación completa en `README_ES.md`

---

**¡Disfruta la aplicación! 🐕🐈**

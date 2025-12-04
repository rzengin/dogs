# Mascotas Uruguay - Plataforma de Cuidado de Mascotas

## 🐾 Descripción

Plataforma web tipo "Airbnb para mascotas" que conecta dueños de mascotas con cuidadores profesionales en Uruguay. Sistema completo con gestión de reservas, calendario de disponibilidad, búsqueda avanzada y perfiles de cuidadores.

## ✨ Características Principales

### Para Usuarios
- 🔍 **Búsqueda Avanzada**: Encuentra cuidadores por ciudad, servicio, tipo de mascota y precio
- 📅 **Calendario de Reservas**: Visualiza todas tus reservas en un calendario interactivo
- 🐕 **Gestión de Mascotas**: Administra los perfiles de tus mascotas
- ⭐ **Sistema de Reseñas**: Lee opiniones de otros usuarios
- 📱 **Perfil Personal**: Gestiona tu información y reservas

### Para Cuidadores
- 📆 **Agenda Visual**: Calendario interactivo para gestionar disponibilidad
- ✅ **Gestión de Reservas**: Confirma o rechaza solicitudes de reserva
- 👥 **Panel de Clientes**: Ve todos tus clientes y sus mascotas
- 💰 **Configuración de Precios**: Define tus tarifas por día
- 📊 **Dashboard Completo**: Visualiza todas tus actividades

### Funcionalidades Técnicas
- 🔐 **Autenticación JWT**: Sistema seguro de login
- 🎨 **Interfaz Moderna**: Diseño responsive con React
- 🗄️ **Base de Datos Robusta**: Prisma ORM con SQLite/PostgreSQL
- 🔄 **API RESTful**: Backend con Express.js
- 🎯 **Roles de Usuario**: USER, SITTER, ADMIN

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd mascotas-uruguay
```

2. **Configurar Backend**
```bash
cd server
npm install
npx prisma generate
npm run seed  # Cargar datos de prueba
npm run dev   # Iniciar servidor en puerto 3000
```

3. **Configurar Frontend**
```bash
cd client
npm install
cp .env.example .env  # Configurar variables de entorno
npm run dev           # Iniciar cliente en puerto 5173
```

4. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Credenciales de Prueba
```
Usuario Regular: juan@example.com / password123
Cuidador 1: maria@example.com / password123
Cuidador 2: carlos@example.com / password123
Administrador: admin@example.com / password123
```

## 📁 Estructura del Proyecto

```
mascotas-uruguay/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   │   ├── Calendar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── pages/         # Páginas de la aplicación
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── BecomeSitter.jsx
│   │   │   ├── SitterDashboard.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── ...
│   │   ├── contexts/      # Context API
│   │   │   └── AuthContext.jsx
│   │   └── utils/         # Utilidades
│   │       └── api.js
│   └── package.json
│
├── server/                # Backend Express
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── middleware/    # Middleware
│   │   ├── routes/        # Rutas de API
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── pets.js
│   │   │   ├── bookings.js
│   │   │   └── sitters.js
│   │   └── index.js
│   ├── prisma/
│   │   ├── schema.prisma  # Esquema de base de datos
│   │   └── seed.js        # Datos de prueba
│   └── package.json
│
└── docker-compose.yml     # Configuración Docker
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/signup` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Usuarios
- `GET /api/users/me` - Perfil del usuario actual
- `GET /api/users` - Listar usuarios (admin)
- `PUT /api/users/:id` - Actualizar usuario

### Mascotas
- `GET /api/pets` - Listar mascotas del usuario
- `POST /api/pets` - Crear mascota
- `PUT /api/pets/:id` - Actualizar mascota
- `DELETE /api/pets/:id` - Eliminar mascota

### Cuidadores
- `GET /api/sitters` - Buscar cuidadores (con filtros)
- `GET /api/sitters/:id` - Obtener cuidador por ID
- `POST /api/sitters/profile` - Crear/actualizar perfil de cuidador
- `GET /api/sitters/:id/availability` - Obtener disponibilidad
- `POST /api/sitters/availability` - Actualizar disponibilidad
- `POST /api/sitters/:id/reviews` - Crear reseña

### Reservas
- `GET /api/bookings` - Reservas del usuario
- `POST /api/bookings` - Crear reserva
- `GET /api/bookings/sitter` - Reservas del cuidador
- `GET /api/bookings/clients` - Clientes del cuidador
- `GET /api/bookings/pets` - Mascotas de clientes
- `PATCH /api/bookings/:id/status` - Actualizar estado

## 🎯 Casos de Uso

### 1. Convertirse en Cuidador

**Usuario Nuevo:**
1. Ir a "Ser Cuidador"
2. Completar formulario completo (incluye crear cuenta)
3. Sistema crea usuario y perfil de cuidador
4. Acceso inmediato al dashboard

**Usuario Existente:**
1. Iniciar sesión
2. Ir a "Ser Cuidador"
3. Completar solo información de cuidador
4. Sistema actualiza rol a SITTER

### 2. Gestionar Disponibilidad
1. Acceder al dashboard de cuidador
2. Ir a pestaña "Agenda"
3. Hacer clic en días del calendario
4. Marcar como disponible o no disponible
5. Cambios se guardan automáticamente

### 3. Buscar y Reservar
1. Ir a página de búsqueda
2. Aplicar filtros (ciudad, servicio, tipo de mascota, precio)
3. Ver resultados filtrados
4. Seleccionar cuidador
5. Crear reserva

### 4. Gestionar Reservas (Cuidador)
1. Ver lista de reservas pendientes
2. Revisar detalles (cliente, mascota, fechas, precio)
3. Confirmar o rechazar reserva
4. Estado se actualiza en tiempo real

## 🛠️ Tecnologías

### Frontend
- React 19
- React Router 7
- Vite
- Lucide React (iconos)
- CSS Modules

### Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite (desarrollo) / PostgreSQL (producción)
- JWT para autenticación
- bcrypt para hash de contraseñas

### DevOps
- Docker & Docker Compose
- Railway (deployment)
- Playwright (testing E2E)

## 📊 Modelo de Datos

### Entidades Principales
- **User**: Usuarios del sistema (USER, SITTER, ADMIN)
- **SitterProfile**: Perfil extendido de cuidadores
- **SitterAvailability**: Disponibilidad por día
- **Pet**: Mascotas de los usuarios
- **Booking**: Reservas entre usuarios y cuidadores
- **Review**: Reseñas de cuidadores

## 🎨 Características del Calendario

### Indicadores Visuales
- 🟠 **Pendiente**: Reserva esperando confirmación
- 🟢 **Confirmada**: Reserva aceptada
- 🔵 **Completada**: Servicio finalizado
- 🔴 **Cancelada**: Reserva cancelada

### Modos de Uso
- **Vista**: Para usuarios, solo visualización
- **Edición**: Para cuidadores, gestión de disponibilidad

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Tokens JWT con expiración de 7 días
- Middleware de autenticación en rutas protegidas
- Validación de datos con express-validator
- Verificación de propiedad de recursos
- CORS configurado

## 🚢 Deployment

### Desarrollo Local
```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

### Producción con Docker
```bash
docker-compose up -d
```

### Railway (Recomendado)

**Despliegue automático con seed incluido:**

1. Conectar repositorio a Railway
2. Agregar PostgreSQL database
3. Configurar variables de entorno:
   - Servidor: `JWT_SECRET`
   - Cliente: `VITE_API_URL`
4. Cada `git push` despliega automáticamente
5. **Los datos de ejemplo se crean automáticamente** en el primer deploy

📚 **Guías de despliegue:**
- `DEPLOY_RAILWAY_QUICK.md` - Guía rápida (5 minutos)
- `RAILWAY_DEPLOYMENT.md` - Guía completa y detallada

## 📝 Variables de Entorno

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mascotas_db"
JWT_SECRET="your-secret-key"
PORT=3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# E2E tests con Playwright
cd client
npm run test:e2e
```

## 📚 Documentación Adicional

- `IMPLEMENTATION_GUIDE.md` - Guía detallada de implementación
- `RESUMEN_IMPLEMENTACION.md` - Resumen ejecutivo en español
- `API_SETUP.md` - Configuración de API

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

## 👥 Autores

Desarrollado para conectar amantes de las mascotas en Uruguay.

## 🙏 Agradecimientos

- Comunidad de React
- Prisma Team
- Todos los amantes de las mascotas

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al equipo de desarrollo.

**¡Disfruta cuidando mascotas! 🐕🐈**

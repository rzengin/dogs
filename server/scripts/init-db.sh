#!/bin/bash

echo "🚀 Iniciando configuración de base de datos..."

# Generar Prisma Client
echo "📦 Generando Prisma Client..."
npx prisma generate

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones..."
npx prisma migrate deploy

# Ejecutar seed
echo "🌱 Poblando base de datos con datos iniciales..."
node prisma/seed.js

echo "✅ Base de datos configurada correctamente!"

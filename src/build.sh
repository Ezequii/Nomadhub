#!/bin/bash

# Script de build que FORÇA a criação de dist/

echo "🧹 Limpando diretórios antigos..."
rm -rf build dist .vite

echo "📦 Instalando dependências..."
npm install

echo "🏗️  Buildando projeto..."
npm run build

echo "✅ Verificando output..."
if [ -d "dist" ]; then
    echo "✅ SUCCESS: dist/ criada!"
    ls -la dist/
    exit 0
else
    echo "❌ ERROR: dist/ não foi criada!"
    echo "📁 Diretórios disponíveis:"
    ls -la
    exit 1
fi

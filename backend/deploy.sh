#!/bin/bash

# VendorLens AI Backend - Production Deployment Guide
# This script helps deploy the backend to Render

set -e

echo "🚀 VendorLens AI Backend - Production Deployment"
echo "=================================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with production environment variables"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run database initialization
echo "🗄️  Initializing database..."
npm run init-db

# Build/verify the application
echo "🔨 Building application..."
npm run build 2>/dev/null || echo "⚠️  No build script (this is OK for Express)"

# Start the server
echo "✅ Starting production server..."
npm start


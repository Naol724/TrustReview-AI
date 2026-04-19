#!/bin/bash
"""
Complete deployment script for TrustReview AI
"""

set -e

echo "=========================================="
echo "TrustReview AI - Production Deployment"
echo "=========================================="

# Backend Deployment
echo ""
echo "1. Deploying Backend..."
cd backend

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Start backend with Gunicorn
echo "Starting backend with Gunicorn..."
nohup gunicorn --config gunicorn.conf.py wsgi:application > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

cd ..

# Frontend Deployment
echo ""
echo "2. Deploying Frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm ci --only=production

# Build for production
echo "Building frontend for production..."
npm run build

# Start frontend with serve (if not using nginx)
if command -v serve &> /dev/null; then
    echo "Starting frontend with serve..."
    nohup serve -s dist -l 3000 > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
else
    echo "Serve not found. Please configure nginx or install serve package."
fi

cd ..

# Docker Deployment (optional)
echo ""
echo "3. Docker Deployment (Optional)..."
if command -v docker-compose &> /dev/null; then
    echo "Building and starting Docker containers..."
    docker-compose up -d --build
    echo "Docker containers started successfully!"
else
    echo "Docker Compose not found. Skipping Docker deployment."
fi

echo ""
echo "=========================================="
echo "Deployment Summary:"
echo "=========================================="
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "Backend PID: $BACKEND_PID"
if [ ! -z "$FRONTEND_PID" ]; then
    echo "Frontend PID: $FRONTEND_PID"
fi
echo ""
echo "To stop services:"
echo "kill $BACKEND_PID"
if [ ! -z "$FRONTEND_PID" ]; then
    echo "kill $FRONTEND_PID"
fi
echo "docker-compose down (if using Docker)"
echo ""
echo "Deployment completed successfully!"

#!/bin/bash
"""
Production startup script for TrustReview AI Backend
"""

echo "Starting TrustReview AI Backend in Production Mode..."

# Set environment variables
export FLASK_ENV=production
export FLASK_DEBUG=0

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Start Gunicorn server
echo "Starting Gunicorn server..."
gunicorn --config gunicorn.conf.py wsgi:application

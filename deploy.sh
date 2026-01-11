#!/bin/bash

# Air Traffic Expert Portal - Cloud Run Deployment Script
# This script builds and deploys the application to Google Cloud Run

set -e  # Exit on any error

echo "🚀 Starting deployment to Cloud Run..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed."
    echo "   Install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Error: Not authenticated with gcloud."
    echo "   Run: gcloud auth login"
    exit 1
fi

# Set project variables
PROJECT_ID="495546644086"
SERVICE_NAME="air-traffic-expert-portal"
REGION="us-west1"

echo "📦 Building application..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

echo "🐳 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --project $PROJECT_ID

echo "✅ Deployment complete!"
echo ""
echo "Your site should be live at:"
gcloud run services describe $SERVICE_NAME --region $REGION --format="value(status.url)"

#!/bin/bash
# This script automates the setup and launch of the Eye Clinic India web application.
# It ensures the frontend is built and served by the backend server on port 9000.

set -e # Exit immediately if a command exits with a non-zero status.

echo "--- Eye Clinic Application Setup & Start Script ---"

# Navigate to the script's directory to ensure relative paths work correctly
cd "$(dirname "$0")"

echo ""
echo "STEP 1: Installing root dependencies (e.g., concurrently)..."
npm install --silent
if [ $? -ne 0 ]; then echo "Error: Root dependency installation failed. Check root package.json."; exit 1; fi

echo ""
echo "STEP 2: Installing server dependencies..."
if [ ! -d "server" ]; then echo "Error: 'server' directory not found. Please ensure it exists at the root."; exit 1; fi
cd server
npm install --silent
if [ $? -ne 0 ]; then echo "Error: Server dependency installation failed. Check server/package.json."; exit 1; fi
cd ..

echo ""
echo "STEP 3: Installing client dependencies..."
if [ ! -d "client" ]; then echo "Error: 'client' directory not found. Please ensure it exists at the root."; exit 1; fi
cd client
npm install --silent
if [ $? -ne 0 ]; then echo "Error: Client dependency installation failed. Check client/package.json."; exit 1; fi

echo ""
echo "STEP 4: Building client application for production..."
# This command creates an optimized production build in client/build folder.
npm run build
if [ $? -ne 0 ]; then echo "Error: Client build failed. Check client build scripts and logs."; exit 1; fi
cd ..

echo ""
echo "STEP 5: Starting the application server..."
echo "The application should become available at http://localhost:9000"
# The Node.js server (in server/index.js) must be configured
# to serve static files from ../client/build and listen on the port specified by PORT.
cd server
PORT=9000 npm start

if [ $? -ne 0 ]; then 
  echo "Error: Failed to start the server. Check server logs and ensure its start script (e.g., 'npm start' in server/package.json) is correctly defined and handles the PORT environment variable."
  exit 1
fi

echo ""
echo "--- Application startup process initiated. If successful, it should be running on port 9000. ---"

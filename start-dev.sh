#!/bin/bash

# Start Aureole Full Stack Development Environment
echo "Starting Aureole Full Stack Application..."

# Start the backend server (in background)
echo "Starting backend server on port 5001..."
cd ./aureole-backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to initialize
sleep 2

# Start the frontend (in foreground)
echo "Starting frontend on port 3000..."
cd ../aureole-website
npm start

# When frontend process ends, kill the backend as well
kill $BACKEND_PID

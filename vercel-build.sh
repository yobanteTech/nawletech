#!/bin/bash
set -e

echo "Running Vite build via Node directly..."

# Run vite through node directly to bypass permission issues
node ./node_modules/vite/bin/vite.js build

echo "Build completed successfully!"

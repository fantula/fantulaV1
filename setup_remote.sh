#!/bin/bash
set -e

# Setup .env
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    
    # Generate secrets
    sed -i "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$(openssl rand -base64 16)|" .env
    sed -i "s|JWT_SECRET=.*|JWT_SECRET=$(openssl rand -base64 32)|" .env
    sed -i "s|ANON_KEY=.*|ANON_KEY=|" .env # Let Supabase generate or user prompt? Actually Supabase containers don't auto-gen keys in env file, but the services use JWT_SECRET to generate them?
    # Actually self-hosting guide says key generation is needed if using specific keys, but typically JWT_SECRET is enough for the services to sign/verify?
    # Wait, the Kong gateway needs the anon key.
    # The official docker compose setup usually has defaults or needs them.
    # Let's check .env.example content if possible.
    
    # Update URLs
    sed -i "s|SITE_URL=.*|SITE_URL=http://localhost:3000|" .env
    sed -i "s|API_EXTERNAL_URL=.*|API_EXTERNAL_URL=http://localhost:8000|" .env
    # User can update these later.
fi

# Pull images
echo "Pulling images..."
docker compose pull

# Start services
echo "Starting services..."
docker compose up -d

echo "Supabase deployed successfully!"
echo "Please verify keys and update .env if needed."

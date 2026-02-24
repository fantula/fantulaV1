#!/bin/bash
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdm16Y29kYmVpam5lbWJqaWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MzE3NTgsImV4cCI6MjA4NTQwNzc1OH0.WU0WCXiOh2Orinc8BSXOg50mFKKp7Ru0tFNxj7YAgFc"
# Target the PROXY URL (fantula.com) instead of direct Supabase URL
URL="https://www.fantula.com/functions/v1/upload-r2"

echo "Testing OPTIONS request via PROXY to $URL..."
curl -i -X OPTIONS "$URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json"

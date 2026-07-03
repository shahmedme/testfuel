#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

if [[ -f .env.production ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
elif [[ -f .env.prod ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.prod
  set +a
fi

: "${DEPLOY_HOST:?Set DEPLOY_HOST in .env.production on the server}"

PUBLIC_BASE="http://${DEPLOY_HOST}"

export SECRET_KEY="${SECRET_KEY:-$(openssl rand -hex 32)}"
export CLIENT_URL="${CLIENT_URL:-${PUBLIC_BASE}:3000}"
export REACT_APP_SERVICE_URL="${REACT_APP_SERVICE_URL:-${PUBLIC_BASE}:8000}"
export DB_SYNCHRONIZE="${DB_SYNCHRONIZE:-true}"
export SMTP_USER="${SMTP_USER:-}"
export SMTP_PASSWORD="${SMTP_PASSWORD:-}"
export DB_HOST="${DB_HOST:-central-postgres}"
export DB_PORT="${DB_PORT:-5432}"
export DB_USERNAME="${DB_USERNAME:-testfuel}"
export DB_PASSWORD="${DB_PASSWORD:?Set DB_PASSWORD in .env.production on the server}"
export DB_NAME="${DB_NAME:-testfuel}"

if [[ -f client/.env.development ]]; then
  set -a
  # shellcheck disable=SC1091
  source client/.env.development
  set +a
fi
export REACT_APP_GA_PROPERTY_ID="${REACT_APP_GA_PROPERTY_ID:-}"
export REACT_APP_CRISP_ID="${REACT_APP_CRISP_ID:-}"

cat > .env.prod <<EOF
DEPLOY_HOST=${DEPLOY_HOST}
SECRET_KEY=${SECRET_KEY}
CLIENT_URL=${CLIENT_URL}
REACT_APP_SERVICE_URL=${REACT_APP_SERVICE_URL}
REACT_APP_GA_PROPERTY_ID=${REACT_APP_GA_PROPERTY_ID}
REACT_APP_CRISP_ID=${REACT_APP_CRISP_ID}
DB_SYNCHRONIZE=${DB_SYNCHRONIZE}
SMTP_USER=${SMTP_USER}
SMTP_PASSWORD=${SMTP_PASSWORD}
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
EOF

DOCKER=(docker)
if ! docker info >/dev/null 2>&1; then
  DOCKER=(sudo docker)
fi

echo "Building and starting production stack..."
"${DOCKER[@]}" compose --env-file .env.prod -f docker-compose.prod.yml up -d --build

echo ""
echo "Stack is running. Service URLs:"
echo "  Client:  ${PUBLIC_BASE}:3000"
echo "  Landing: ${PUBLIC_BASE}:3001"
echo "  API:     ${PUBLIC_BASE}:8000"
echo ""
"${DOCKER[@]}" compose --env-file .env.prod -f docker-compose.prod.yml ps

#!/bin/sh
set -eu

DATA_DIR="$(dirname "${DATA_FILE:-/app/src/data/data.json}")"
SEED_DIR="/app/src/data-seed"

mkdir -p "$DATA_DIR"

if [ ! -f "${DATA_FILE:-/app/src/data/data.json}" ]; then
  echo "Initializing CPM data directory at $DATA_DIR"
  cp -a "$SEED_DIR"/. "$DATA_DIR"/
fi

if [ -z "${SESSION_SECRET:-}" ]; then
  export SESSION_SECRET="$(node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))')"
  echo "SESSION_SECRET was not set; generated a temporary secret for this container start."
fi

if [ -z "${PURGE_SECRET:-}" ]; then
  export PURGE_SECRET="$(node -e 'console.log(require("crypto").randomBytes(24).toString("hex"))')"
  echo "PURGE_SECRET was not set; generated a temporary secret for this container start."
fi

export IS_DEBUG="${IS_DEBUG:-false}"

exec "$@"

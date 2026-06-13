# Docker Deployment

Cisco Provisioning Manager listens on TCP port `6970`.

## Local Compose

```bash
docker compose up -d
```

Open:

```text
http://SERVER_IP:6970/login
```

Default application login:

```text
admin / admin
```

Change the secrets in `compose.yaml` before using this outside a lab.

## Persistent Data

The container stores mutable CPM data in:

```text
/app/src/data
```

The included compose file mounts that path as the named volume `cpm_data`.
If the mounted directory is empty, the container seeds it with the bundled
default data on first start.

## GHCR Image

Images are published to:

```text
ghcr.io/legop3/cisco-provisioning-server
```

Typical OMV/Portainer compose using the published image:

```yaml
services:
  cisco-provisioning-manager:
    image: ghcr.io/legop3/cisco-provisioning-server:main
    container_name: cisco-provisioning-manager
    ports:
      - "6970:6970"
    environment:
      NODE_ENV: production
      DATA_FILE: /app/src/data/data.json
      IS_DEBUG: "false"
      SESSION_SECRET: replace-with-a-long-random-value
      PURGE_SECRET: replace-with-another-random-value
      SHARED_DEVICE_SECRET: replace-with-device-secret
    volumes:
      - ./cpm-data:/app/src/data
    restart: unless-stopped
```

For Cisco phone provisioning, point the phone's provisioning server to the host
running this container. The phone will fetch:

```text
http://SERVER_IP:6970/SEP<MAC>.cnf.xml
```

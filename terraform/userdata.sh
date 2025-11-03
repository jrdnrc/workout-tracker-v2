#!/bin/bash
set -e

export DEBIAN_FRONTEND=noninteractive
# Update system
add-apt-repository universe
apt-get update -y
apt-get upgrade -y

# Basic packages
apt-get install -y fail2ban git docker.io

# Enable firewall
# ufw allow OpenSSH
# ufw allow 80/tcp
# ufw allow 443/tcp
# ufw --force enable

# Harden SSH
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

# Create app directory
mkdir -p /srv/myapp
chown -R root:root /srv/myapp

# Create deploy script
cat <<'EOF' > /srv/myapp/deploy.sh
#!/bin/bash
set -e
cd /srv/myapp
docker compose pull
docker compose up -d --remove-orphans
EOF

chmod +x /srv/myapp/deploy.sh

# Enable Docker on boot
systemctl enable docker

reboot
#!/bin/bash
set -e

export DEBIAN_FRONTEND=noninteractive
# Update system
add-apt-repository universe

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


apt-get update -y
apt-get upgrade -y

# Basic packages
apt-get install -y docker-compose-plugin ca-certificates curl fail2ban git docker.io

# Enable firewall
# ufw allow OpenSSH
# ufw allow 80/tcp
# ufw allow 443/tcp
# ufw --force enable

# Harden SSH
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

# Create app directory
mkdir -p /srv
chown -R root:root /srv

# Create deploy script
cat <<'EOF' > /srv/deploy.sh
#!/bin/bash
set -e
cd /srv
docker compose pull
docker compose up -d --remove-orphans
EOF

chmod +x /srv/deploy.sh

# Enable Docker on boot
systemctl enable docker

reboot
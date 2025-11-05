terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

resource "digitalocean_ssh_key" "github_actions" {
  name       = "github-actions"
  public_key = file(var.ssh_pub_key)
}

resource "digitalocean_droplet" "app" {
  name   = "workout-tracker-vps"
  region = var.droplet_region
  size   = var.droplet_size
  image  = var.droplet_image

  ssh_keys = [digitalocean_ssh_key.github_actions.id]

  user_data  = file("userdata.sh") # we’ll define this below
  monitoring = true
  ipv6       = false
  backups    = false

  connection {
    type        = "ssh"
    user        = "root"
    private_key = file("~/workout_tracker_rsa")
    host        = self.ipv4_address
    port        = 22
    timeout     = "2m"
  }

  provisioner "file" {
    source      = "./../docker-compose.production.yml"
    destination = "/srv/docker-compose.yml"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir -p /root/.docker",
      "echo '{\"auths\":{\"ghcr.io\":{\"auth\":\"'$(echo -n \"USERNAME:${var.gh_token}\" | base64)'\"}}}' > /root/.docker/config.json"
      ]
  }

  tags = ["workout-tracker", "production"]
}

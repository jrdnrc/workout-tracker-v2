provider "digitalocean" {
  token = var.do_token
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
    private_key = file("~/.ssh/id_rsa")
    host        = self.ipv4_address
    port        = 22
    timeout     = "2m"
  }

  tags = ["workout-tracker", "production"]
}
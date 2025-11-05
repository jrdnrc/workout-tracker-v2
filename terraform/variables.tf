variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "cf_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "gh_token" {
  description = "GitHub API token"
  type        = string
  sensitive   = true
}

variable "ssh_pub_key" {
  description = "Path to your SSH public key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "droplet_size" {
  description = "VPS Size"
  type        = string
  default     = "s-1vcpu-512mb-10gb"
}

variable "droplet_image" {
  description = "VPS Image"
  type        = string
  default     = "ubuntu-24-04-x64"
}

variable "droplet_region" {
  description = "Region"
  type        = string
  default     = "lon1"
}
variable "cf_zone_id" {
  description = "Cloudflare Zone ID"
  type        = string
}

variable "ssh_user" {
  description = "SSH User"
  type        = string
  sensitive   = true
}

variable "ssh_private_key" {
  description = "SSH Key"
  type        = string
  sensitive   = true
}

variable "build_compute" {
  description = "Whether to build the resources that cost money"
  type        = bool
  default     = false
}

locals {
  droplet_ip = var.build_compute ? module.digital_ocean[0].droplet_ip : null
}
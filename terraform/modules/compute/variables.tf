variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "ssh_pub_key" {
  description = "Path to your SSH public key"
  type        = string
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

variable "gh_token" {
  description = "GitHub API token"
  type        = string
  sensitive   = true
}
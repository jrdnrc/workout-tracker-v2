variable "gh_token" {
  description = "GitHub API token"
  type        = string
  sensitive   = true
}

variable "ssh_private_key" {
  description = "SSH Key"
  type        = string
  sensitive   = true
}

variable "ssh_user" {
  description = "SSH User"
  type        = string
  sensitive   = true
}

variable "deploy_host" {
  description = "Host IP Address to deploy to"
  type        = string
  default     = ""
}

variable "add_deploy_host" {
  type    = bool
  default = false
}

output "droplet_ip" {
  value = local.droplet_ip
}

output "ssh_connection_string" {
  value = "ssh -o StrictHostKeyChecking=no -i ${var.ssh_private_key} ${var.ssh_user}@${local.droplet_ip}"

  sensitive = true
}

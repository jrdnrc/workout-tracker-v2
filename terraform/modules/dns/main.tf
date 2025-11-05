terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.12.0"
    }
  }
}

resource "cloudflare_dns_record" "records" {
  for_each = toset(var.names)

  zone_id = var.zone_id
  name    = each.value
  type    = var.type
  content = var.content
  ttl     = var.ttl
  proxied = var.proxied
}
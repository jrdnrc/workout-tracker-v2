terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.12.0"
    }

    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }

    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

provider "cloudflare" {
  api_token = var.cf_token
}

module "digital_ocean" {
  count  = var.build_compute ? 1 : 0
  source = "./modules/compute"

  do_token    = var.do_token
  ssh_pub_key = var.ssh_pub_key
  gh_token    = var.gh_token

  droplet_size = var.droplet_size
}

module "cloudflare_dns_entry" {
  count    = var.build_compute ? 1 : 0
  source   = "./modules/dns"
  zone_id  = var.cf_zone_id
  content  = local.droplet_ip
  cf_token = var.cf_token

  names = [
    "wo-gql.jcrocker.uk",
    "wo.jcrocker.uk",
  ]
}

module "github_repository" {
  source          = "./modules/github"
  gh_token        = var.gh_token
  ssh_user        = var.ssh_user
  ssh_private_key = var.ssh_private_key
  deploy_host     = local.droplet_ip
  add_deploy_host = var.build_compute
}

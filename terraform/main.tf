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

module "digital_ocean" {
  source = "./modules/compute"

  do_token    = var.do_token
  ssh_pub_key = var.ssh_pub_key
  gh_token    = var.gh_token
}

module "cloudflare_dns_entry" {
  source   = "./modules/dns"
  zone_id  = var.cf_zone_id
  content  = module.digital_ocean.droplet_ip
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
  deploy_host     = module.digital_ocean.droplet_ip
}

moved {
  from = github_repository.workout_tracker
  to   = module.github_repository.github_repository.workout_tracker
}

moved {
  from = github_actions_secret.ghcr_token
  to   = module.github_repository.github_actions_secret.ghcr_token
}

moved {
  from = github_actions_secret.ssh_private_key
  to   = module.github_repository.github_actions_secret.ssh_private_key
}

moved {
  from = github_actions_secret.ssh_user
  to   = module.github_repository.github_actions_secret.ssh_user
}

moved {
  from = github_branch.main
  to   = module.github_repository.github_branch.main
}

moved {
  from = github_branch_default.default
  to   = module.github_repository.github_branch_default.default
}

moved {
  from = github_repository_file.gitignore
  to   = module.github_repository.github_repository_file.gitignore
}

moved {
  from = digitalocean_ssh_key.github_actions
  to   = module.digital_ocean.digitalocean_ssh_key.github_actions
}
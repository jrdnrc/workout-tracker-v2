# Initialize the provider
provider "cloudflare" {
  # The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).
  api_token = var.cf_token
}

module "dns_entry" {
  source  = "./modules/dns_entry"
  zone_id = var.cf_zone_id
  content = digitalocean_droplet.app.ipv4_address

  names = [
    "wo-gql.jcrocker.uk",
    "wo.jcrocker.uk",
  ]
}
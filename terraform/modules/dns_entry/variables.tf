variable "zone_id" {}
variable "names" {
  type = list(string)
}

variable "content" {
  type = string
}

variable "type" {
  type    = string
  default = "A"
}

variable "proxied" {
  type    = bool
  default = true
}

variable "ttl" {
  type    = number
  default = 1
}
provider "github" {
  token = var.gh_token # or `GITHUB_TOKEN`
  owner = "jrdnrc"
}

resource "github_repository" "workout_tracker" {
  name        = "workout-tracker-v2"
  description = "Workout Tracker"
  visibility  = "public"

  auto_init = true

  allow_auto_merge = true
  delete_branch_on_merge = true
  
  allow_merge_commit = false
  allow_rebase_merge = false
  allow_squash_merge = true
}

resource "github_branch" "main" {
  repository = github_repository.workout_tracker.name
  branch     = "main"
}

resource "github_branch_default" "default"{
  repository = github_repository.workout_tracker.name
  branch     = github_branch.main.branch
}

resource "github_actions_secret" "deploy_host" {
  repository       = github_repository.workout_tracker.name
  secret_name      = "DEPLOY_HOST"
  plaintext_value  = digitalocean_droplet.app.ipv4_address
}

resource "github_actions_secret" "ssh_user" {
  repository       = github_repository.workout_tracker.name
  secret_name      = "SSH_USER"
  plaintext_value  = var.ssh_user
}

resource "github_actions_secret" "ssh_private_key" {
  repository       = github_repository.workout_tracker.name
  secret_name      = "SSH_PRIVATE_KEY"
  plaintext_value  = var.ssh_private_key
}

resource "github_actions_secret" "ghcr_token" {
  repository       = github_repository.workout_tracker.name
  secret_name      = "GHCR_TOKEN"
  plaintext_value  = var.gh_token
}

resource "github_repository_file" "gitignore" {
  repository          = github_repository.workout_tracker.name
  branch              = github_branch.main.branch
  file                = ".gitignore"
  content             = file("./../.gitignore")
  commit_message      = "Managed by Terraform"
  commit_author       = "Jordan Crocker"
  commit_email        = "jordan@jcrocker.uk"
  overwrite_on_create = true
}
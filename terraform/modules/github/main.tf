provider "github" {
  token = var.gh_token # or `GITHUB_TOKEN`
  owner = "jrdnrc"
}

resource "github_repository" "workout_tracker" {
  name        = "workout-tracker-v2"
  description = "Workout Tracker"
  visibility  = "public"

  # required to allow for a file to be committed
  auto_init = true

  allow_auto_merge       = true
  delete_branch_on_merge = true

  allow_merge_commit = false
  allow_rebase_merge = false
  allow_squash_merge = true

  lifecycle {
    prevent_destroy = true
  }
}

resource "github_branch" "main" {
  repository = github_repository.workout_tracker.name
  branch     = "main"

  lifecycle {
    prevent_destroy = true
  }
}

resource "github_branch_default" "default" {
  repository = github_repository.workout_tracker.name
  branch     = github_branch.main.branch

  lifecycle {
    prevent_destroy = true
  }
}

resource "github_actions_secret" "deploy_host" {
  for_each        = var.add_deploy_host ? { "DEPLOY_HOST" = var.deploy_host } : {}
  repository      = github_repository.workout_tracker.name
  secret_name     = each.key
  plaintext_value = each.value
}

resource "github_actions_secret" "ssh_user" {
  repository      = github_repository.workout_tracker.name
  secret_name     = "SSH_USER"
  plaintext_value = var.ssh_user
}

resource "github_actions_secret" "ssh_private_key" {
  repository      = github_repository.workout_tracker.name
  secret_name     = "SSH_PRIVATE_KEY"
  plaintext_value = file(var.ssh_private_key)
}

resource "github_actions_secret" "ghcr_token" {
  repository      = github_repository.workout_tracker.name
  secret_name     = "GHCR_TOKEN"
  plaintext_value = var.gh_token
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

  lifecycle {
    prevent_destroy = true
  }
}

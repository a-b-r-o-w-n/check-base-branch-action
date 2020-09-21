# Check Base Branch

check-base-branch validates that pull requests are opened against allowed branches, failing the check or updating the base branch if not.

## Usage

#### Failing the check
In `.github/workflows/main.yml:

```yml
name: Example Workflow

on: [pull_request]

jobs:
  check-base-branch:
    steps:
      - uses: a-b-r-o-w-n/check-base-branch-action@v1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          protected-branches: "master, production"
```

#### Updting the base branch
In `.github/workflows/main.yml:

```yml
name: Example Workflow

on: [pull_request]

jobs:
  check-base-branch:
    steps:
      - uses: a-b-r-o-w-n/check-base-branch-action@v1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          protected-branches: "master, production"
          default-branch: "dev"
          update-branch: true
```

## Inspiration

Some projects set a default branch to something other than their development branch. It is easy for contributors to unknowingly open pull requests against the default branch instead of the development branch.
Sometimes this was missed for small changes and resulted in commits getting merged into the protected branch. This action was created to help maintainers catch this problem in an automated way.

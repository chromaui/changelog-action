# test-changelog

Write a changelog entry every time a PR is merged.

Use like so:

```yaml
name: changelog
on:
  pull_request:
    types:
      - closed
    branches:
      - main
jobs:
  get-and-write-changelog:
    runs-on: ubuntu-latest
    # Closed PRs can be both merged or not
    if: ${{ github.event.pull_request.merged == true}}
    steps: 
      - uses: actions/checkout@v2
        with:
          token: ${{ secrets.TOKEN }}
      - uses: chromaui/changelog-action
        with:
          pull_request: ${{ toJSON(github.event.pull_request) }}
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          branch: main
          commit_message: Update CHANGELOG.md [skip ci]
          file_pattern: CHANGELOG.md
          commit_user_name: Changelog Bot
```

You'll need to set the `secrets.TOKEN` github action secret.

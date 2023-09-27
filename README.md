# Setup CML Action

![CML](https://user-images.githubusercontent.com/414967/90448663-1ce39c00-e0e6-11ea-8083-710825d2e94e.png)

Continuous Machine Learning ([CML](https://cml.dev)) is an open-source library
for implementing continuous integration & delivery (CI/CD) in machine learning
projects. Use it to automate parts of your development workflow, including
machine provisioning; model training and evaluation; comparing ML experiments
across your project history, and monitoring changing datasets.

The [iterative/setup-cml](https://github.com/iterative/setup-cml) can be used as
a GitHub Action to provide [CML](https://cml.dev) functions in your workflow.
The action allows users to install CML without using the CML Docker container.

This action gives you:

- Access to all [CML functions](https://github.com/iterative/cml#cml-functions).
  For example:
  - `cml comment create` for publishing data visualization and metrics from your
    CI workflow as comments in a pull request.
  - `cml pr create` to open a pull request.
  - `cml runner launch`, a function that enables workflows to provision cloud
    and on-premise computing resources for training models.
- The freedom 🦅 to mix and match CML with your favorite data science tools and
  environments.

Note that CML does not include DVC and its dependencies (see the
[Setup DVC Action](https://github.com/iterative/setup-dvc)).

## Note on v2

`v1` of setup-cml was a wrapper around a set of npm installs. `v2` installs CML from its
pre-packaged binaries. Then attempts to run `npm install --global canvas@2 vega@5 vega-cli@5 vega-lite@5`
if you do not wish to install these tools pass `vega: false` to the action.

## Usage

This action is tested on `ubuntu-latest`, `macos-latest` and `windows-latest`.

Basic usage:

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: iterative/setup-cml@v2
```

A specific version can be pinned to your workflow.

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: iterative/setup-cml@v2
    with:
      version: '0.18.1'
```

## Inputs

The following inputs are supported.

- `version` - (optional) The version of CML to install (e.g. '0.18.1'). Defaults
  to `latest` for the
  [most recent CML release](https://github.com/iterative/cml/releases).
- `vega` - (optional) Whether to install vega dependencies. Defaults to `true`.
  runs command `npm install --global canvas@2 vega@5 vega-cli@5 vega-lite@5`

## A complete example

![](https://static.iterative.ai/img/cml/first_report.png) _A sample CML report
from a machine learning project displayed in a Pull Request._

Assume that we have a machine learning script, `train.py` which outputs an image
`plot.png`:

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: iterative/setup-cml@v2
  - env:
      REPO_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Can use the default token for most functions
    run: |
      python train.py --output plot.png

      echo 'My first CML report' > report.md
      echo '![](./plot.png)' >> report.md
      cml comment create --publish report.md
```
In general [GitHub's runner token can be given enough permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token) to perform most functions.
When using the `cml runner launch` command a [PAT is required](https://cml.dev/doc/self-hosted-runners?tab=GitHub#personal-access-token)

### CML functions

CML provides several helper functions. See [the docs](https://cml.dev/doc).

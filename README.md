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
  - `cml create comment` for publishing data visualization and metrics from your
    CI workflow as comments in a pull request.
  - `cml pr create` to open a pull request.
  - `cml runner launch`, a function that enables workflows to provision cloud
    and on-premise computing resources for training models.
- The freedom 🦅 to mix and match CML with your favorite data science tools and
  environments.

Note that CML does not include DVC and its dependencies (see the
[Setup DVC Action](https://github.com/iterative/setup-dvc)).

## Usage

This action is tested on `ubuntu-latest`, `macos-latest` and `windows-latest`.

Basic usage:

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: iterative/setup-cml@v1
```

A specific version can be pinned to your workflow.

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: iterative/setup-cml@v1
    with:
      version: '0.18.1'
```

Self-hosted example:

```yaml
runs-on: [self-hosted]
steps:
  - uses: actions/setup-node@v3
    with:
      node-version: '16'
  - uses: actions/checkout@v3
  - uses: iterative/setup-cml@v1
    with:
      sudo: false
```

## Inputs

The following inputs are supported.

- `version` - (optional) The version of CML to install (e.g. '0.18.1'). Defaults
  to `latest` for the
  [most recent CML release](https://github.com/iterative/cml/releases).
- `sudo` - (optional) Enables the use of sudo whilst installing CML. Defaults to
  `true`
- `force` - (optional) Forces the install. Useful in scenarios where CML is
  already installed and in use. Defaults to `false`

## A complete example

![](https://static.iterative.ai/img/cml/first_report.png) _A sample CML report
from a machine learning project displayed in a Pull Request._

Assume that we have a machine learning script, `train.py` which outputs an image
`plot.png`:

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: iterative/setup-cml@v1
  - run: |
      python train.py --output plot.png

      echo 'My first CML report' > report.md
      echo '![](./plot.png)' >> report.md
      cml comment create --publish report.md
```

### CML functions

CML provides several helper functions. See [the docs](https://cml.dev/doc).

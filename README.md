# Setup CML Action

![CML](https://user-images.githubusercontent.com/414967/90448663-1ce39c00-e0e6-11ea-8083-710825d2e94e.png)

Continuous Machine Learning ([CML](https://cml.dev/)) is an open-source library
for implementing continuous integration & delivery (CI/CD) in machine learning
projects. Use it to automate parts of your development workflow, including model
training and evaluation, comparing ML experiments across your project history,
and monitoring changing datasets.

The [iterative/setup-cml](https://github.com/iterative/setup-cml) action is a
JavaScript action that sets up [CML](https://cml.dev/) functions in your GitHub
Actions workflow. It installs the specified version by `version` action input
parameter.

The main difference between this and the CML container is that the latest can
work also as a self-hosted runner with GPU capabilites and a cloud provisioner.
Additionally comes packed with [DVC](https://dvc.org). As said this action only
installs the [functions](#CML-functions) available in CML to generate comments,
graphs and checks.

## Usage

This action can be run on `ubuntu-latest`, `macos-latest`.

Basic:

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: iterative/cml-action@v1
```

A specific version can be pinned to your workflow.

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: iterative/setup-cml@v1
    with:
      version: '1.0.1'
```

## Inputs

The following inputs are supported.

- `version` - (optional) The version of CML to install. A value of `latest` will
  install the latest version of CML functions. Defaults to `latest`.

## Outputs

Setup CML has no outputs.

## A complete example

![](https://github.com/iterative/cml/blob/master/imgs/cml_first_report.png) _A
sample CML report from a machine learning project displayed in a Pull Request._

Assume that we have a machine learning script, `train.py`, that outputs an image
`plot.png`.

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: iterative/setup-cml@v1
    with:
      version: latest

  - run: |
      # train will generate plot.png
      python train.py

      echo 'My first CML report' > report.md
      cml-publish plot.png --md > report.md
      cml-send-comment report.md
```

### CML functions

CML provides several helper functions to help package outputs from ML workflows,
such as numeric data and data vizualizations about model performance, into a CML
report. Below is a list of functions for writing markdown reports and delivering
those reports to your Pull Request as a comment.
[Read the docs](https://github.com/iterative/cml#readme).

| Function                | Description                                                 | Inputs                                                    |
| ----------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| `cml-send-comment`      | Return CML report as a comment in your GitHub pull request. | `<path to report> --head-sha <sha>`                       |
| `cml-send-github-check` | Return CML report as a check in GitHub                      | `<path to report> --head-sha <sha>`                       |
| `cml-publish`           | Publish an image for writing to CML report.                 | `<path to image> --title <image title> --md`              |
| `cml-tensorboard-dev`   | Return a link to a Tensorboard.dev page                     | `--logdir <path to logs> --title <experiment title> --md` |

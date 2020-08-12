![Hero](https://user-images.githubusercontent.com/414967/90075540-f1376f00-dcfd-11ea-8cbe-f8ef6a2d1c15.png)

Continuous Machine Learning ([CML](https://cml.dev/)) is an open-source library for
implementing continuous integration & delivery (CI/CD) in machine learning
projects. Use it to automate parts of your development workflow, including model
training and evaluation, comparing ML experiments across your project history,
and monitoring changing datasets.

This GitHub Action installs a library of CML functions into your GitHub Actions runner to help you write visual and text reports in pull requests. 


## Sample usage
Assume that we have a machine learning script, `train.py`, that outputs an image `plot.png`.

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: iterative/setup-cml@v1
    with:
      version: latest

  - run: |
      python train.py
      
      echo 'My first CML report' > report.md
      cml-publish plot.png --md > report.md
      cml-send-comment report.md
```

Currently, this Action is tested with `ubuntu-latest`,`macos-latest`, and `container`.


### CML functions

CML provides several helper functions to help package outputs from ML
workflows, such as numeric data and data vizualizations about model performance,
into a CML report. Below is a list of functions for writing markdown reports and delivering
those reports to your Pull Request as a comment.

| Function                | Description                                                    | Inputs                                                    |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| `cml-send-comment`      | Return CML report as a comment in your GitHub pull request.    | `<path to report> --head-sha <sha>`                       |
| `cml-send-github-check` | Return CML report as a check in GitHub                         | `<path to report> --head-sha <sha>`                       |
| `cml-publish`           | Publish an image for writing to CML report.                    | `<path to image> --title <image title> --md`              |
| `cml-tensorboard-dev`   | Return a link to a Tensorboard.dev page                        | `--logdir <path to logs> --title <experiment title> --md` |

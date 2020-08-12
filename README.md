![Hero](https://user-images.githubusercontent.com/414967/90075540-f1376f00-dcfd-11ea-8cbe-f8ef6a2d1c15.png)

This action installs [CML](https://cml.dev/) so your workflow can access it,
uninstalling previous CML installations.

# Usage

See [action.yml](https://github.com/iterative/setup-cml/action.yml) and
[CML docs](https://github.com/iterative/cml#readme).

Basic:

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: iterative/setup-cml@v1
    with:
      version: latest

  - run: |
      echo 'Hello CML!' > report.md
      cml-send-comment report.md
```

# CML Action V1

This action installs [CML](https://cml.dev/) so your workflow can access it.  
It automatically uninstalls previous DVC installations.

# Usage

See [action.yml](https://github.com/iterative/setup-cml/action.yml)

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

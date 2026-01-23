[![CircleCI](https://img.shields.io/circleci/build/gh/hanggrian/pve-planner)](https://app.circleci.com/pipelines/gh/hanggrian/pve-planner/)
[![Codecov](https://img.shields.io/codecov/c/gh/hanggrian/pve-planner)](https://app.codecov.io/gh/hanggrian/pve-planner/)

# PVE Planner

Calculate resource allocation for Proxmox Virtual Environment.

## Building

Setup GitHub API token in `.netrc`:

```
machine api.github.com
  login GITHUB_USERNAME
  password GITHUB_TOKEN
```

This allows the Python script to fetch the latest resource allocation from
[the community scripts](https://github.com/community-scripts/ProxmoxVE).

```sh
python3 generate_images.py
```

Then, build the React app:

```sh
npm run build && npm run preview
```

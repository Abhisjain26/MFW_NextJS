---
title: Basic Setup
sidebar_label: Basic Setup
slug: basic-setup
custom_edit_url: null
---

The setup process for a Headless Akinon Commerce Cloud Storefront will be guided in this page. Follow the steps below to get started.

## Installation

1. To begin, it is recommended to use `yarn` as the package manager.

   If macOS is the operating system, Homebrew can be used for installation. For non-mac users, npm can be used for a global installation.

   ```bash
   # For macOS users
   brew install yarn

   # For non-mac users
   npm i -g yarn
   ```

2. Next, the storefront needs to be installed by using the `projectzero` CLI.

   ```bash
   npx @akinon/projectzero --create
   ```

3. Provide the following information:

   - **Brand name (eg. Project Zero) (required):** Enter the name for your project.
   - **Project description (optional):** Optionally provide a project description.
   - **Commerce URL (optional):** Enter the URL to connect with Omnitron. This can be edited later from the environment file.

4. After providing the necessary information, navigate to the project folder.

   ```bash
   cd project-path/project-name
   ```

## Development

To start the development server, run the following command.

```bash
yarn dev
```

This will initiate the development environment for the Headless Akinon Commerce Cloud Storefront, allowing users to begin building and testing their storefront.

## Production

To build and run the production version of the storefront, run the following command.

```bash
yarn build
yarn start
```

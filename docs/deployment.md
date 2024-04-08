
## Deployment

### Required Environment Variables

Before initiating your application's deployment to ACC, it is important to set up the necessary environment variables. Please ensure you have added the following variables to your application before your first deployment:

- **NEXT_PUBLIC_URL**: The website's URL, accessible from the ACC dashboard.
- **NEXTAUTH_URL**: The website's URL, identical to NEXT_PUBLIC_URL.
- **NEXTAUTH_SECRET**: A secret string for session encryption, generated from any online tool.
- **CACHE_SECRET**: A secret string for encrypting Redis cache requests. Generate this using any online tool; without it, Redis cache may not function properly.

### Add Remote Repository

For deploying your application to ACC, the addition of a remote repository is required. Obtain the URL of the remote repository from the ACC dashboard.

Run the following command to add the remote repository:

```bash
git remote add acc <acc-repository-url>
```

### Create and Push a Tag

For deploying your application to ACC, create a tag within your repository. Ensure all changes are committed before proceeding.

Run the following command to create a tag:

```bash
git tag <tag-name>
```

Then, push the tag to the remote repository:

```bash
git push acc <tag-name>
```

### Build Your Application

Navigate to My Applications > {Your Application} > Builds. Click the **Build** button. Enter the tag name created in the previous step and click **Build** button.


### Deploy Your Application

Upon successful completion of the build, initiate the deployment by providing the same tag name and clicking the **Deploy** button.

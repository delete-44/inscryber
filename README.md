# Inscryber

Inscryber is a project intended to allow people to create custom [Inscryption](https://www.inscryption.com/) cards; various information is submitted and cloudinary is used to build an image of a card matching those requirements.

It has a temporary URL at [https://inscryber.netlify.app/](https://inscryber.netlify.app/).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Development

Run the development server with

```bash
npm run dev
```

and visit [http://localhost:3000](http://localhost:3000).

## Styling

Styling is built using [Tailwind](https://tailwindcss.com/); designs should be created as "mobile-first", with an `md` breakpoint overwriting styles on larger devices.

## Deployment

The app is hosted via [Netlify](https://www.netlify.com/), which runs helpful checks for dead links prior to deployment. It also spins up temporary instances for each pull request, which can be used to test changes in a live environment.

## GitHub Actions

There are two actions associated with this repo.

### `Run Tests`

#### What

This is fairly self explanatory. Uses the `test-ci` command defined in `package.json` to run tests without watching them.

Helpful to catch any failures that could be missed.

#### When

Runs when any pull request is opened against or change is made to `main` branch.

### `Cloudinary Cleanup`

#### What

To generate the `portrait` transformation, user images are uploaded to the `Inscryption/Uploads` folder on cloudinary. These are not needed after the user session closes (or indeed, able to be accessed) so need to be cleared to save storage space.

This job has three key steps:

1. Query the Cloudinary `search` API for any uploaded images in that subfolder that were uploaded more than a day ago
2. Use `jq` to format the response to this query and retrieve the `public_id`'s of these uploads
3. Query the cloudinary `admin` API to delete these files

As this is rate limited, there is a fallback via the UI. Talk to @delete-44 about this if it becomes an issue.

Each run deletes a maximum of 100 images.

Environment variables such as authentication secrets are stored in the GitHub [action secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

#### When

This job runs every 6 hours. Emails will be sent to collaborators in event of failure.

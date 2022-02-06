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

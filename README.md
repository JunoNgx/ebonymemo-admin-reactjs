# Ebony Memo - Content Management Application

This application provides GUI and basic functionalities to manage content for [Ebony Memo](https://ebonymemo.com/), an arthouse videogame curator website for smartphones. For the remaining components:
* [View the frontend source](https://github.com/JunoNgx/ebonymemo-frontend-next).
* [View the backend source](https://github.com/JunoNgx/ebonymemo-backend-nodejs).

## Current deployment

This application is currently deployed for production [via Netlify](https://eleum-loyce.netlify.app/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/824c2e38-e99c-41ff-9ef5-a64f2b579618/deploy-status)](https://app.netlify.com/sites/eleum-loyce/deploys)

## Tech stack

This application is powered by [ReactJS](https://reactjs.org/) and [SASS](https://sass-lang.com/) and deployed on Netlify.

## Environment variables

`REACT_APP_API_URL`: url to backend API.

The environment variable `.env` is already setup in the repository as the only variable is public.

## ReactJS

For more information on ReactJS, visit [the documentation on ReactJS.org](https://reactjs.org/docs/getting-started.html).

## How to run

First, clone the repository and move into the directory:

```
git clone https://github.com/JunoNgx/ebonymemo-backend-nodejs.git
cd ebonymemo-backend-nodejs
```

Then, run the developement server:

```bash
npm run dev
# or
yarn dev
```

[http://localhost:3000](http://localhost:3000) should be automatically be opened with your default browser.

The project is setup with `nodemon` and any file change will trigger a restart.

## Contribution

For suggestions and  criticism, please feel free to open an issue for this repository.
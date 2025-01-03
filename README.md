![DownloadTracker](https://github.com/Lorenzo0111/DownloadTracker/blob/master/media/Logo.png?raw=true)

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/Lorenzo0111/DownloadTracker)](https://github.com/Lorenzo0111/DownloadTracker/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Lorenzo0111/DownloadTracker)](LICENSE)
[![Discord](https://img.shields.io/discord/1088775598337433662)](https://discord.gg/HT47UQXBqG)

  <hr />

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FDownloadTracker&env=DATA,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SECRET,NEXT_PUBLIC_AUTH_METHOD"><img height="32" src="https://vercel.com/button" /></a>
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/Lorenzo0111/DownloadTracker"><img height="32" src="https://www.netlify.com/img/deploy/button.svg" /></a>
<a href="https://supafork.chroxify.com/new?repository_url=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FDownloadTracker"><img height="32" src="https://supafork.chroxify.com/button" /></a>

</div>

## What is DownloadTracker

DownloadTracker is an elegant dashboard that allows you to track the downloads of GitHub releases through its privacy friendly API proxy.

<img src="https://github.com/Lorenzo0111/DownloadTracker/blob/master/media/Dashboard.png?raw=true" height="400" />

## Deploying

You'll have to set the following environment variables to setup the proxy, here is a list of them:

| Key                           | Description              | Example         |
| ----------------------------- | ------------------------ | --------------- |
| DATA                          | Allowed github authors   | ["Lorenzo0111"] |
| NEXT_PUBLIC_SUPABASE_URL      | Your supabase url        |                 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your supabase anon key   |                 |
| SUPABASE_SECRET               | Your supabase secret key |                 |
| NEXT_PUBLIC_AUTH_METHOD       | The auth method to use   | discord         |

You will also need a supabase database, you can create that by clicking the "Fork Database" button on the head of this documentation.

Now, enable an oauth provider, in my example I use discord. You can enable it by [clicking here](https://supabase.com/dashboard/project/_/auth/providers) and configuring all the required variables.

> ⚠️ Note that the default url will redirect to this github repository. You must navigate to `/dashboard` to access the dashboard.

### Serverless

You can deploy the project to Vercel or any other hosting service by clicking the buttons above.

### Selfhosting

If you want to selfhost, you can run `pnpm install`, `pnpm run build` and `pnpm run start` to start the program.

The dashboard will usually be available [here](http://localhost:3000/dashboard).

### Adding an admin

You must be an admin to access the dashboard. You can use the CLI for that. Here are the steps:
- Create an account on the dashboard
- Set the same .env variables on your local environment
- Run `pnpm install`
- Run `pnpm dt users:list` to see the list of users
- Run `pnpm dt admins:add <id>` to add your user as admin

> ⚡ You can also add a user as admin by adding a row into the admins table from the [Supabase Table Editor](https://supabase.com/dashboard/project/_/editor)

## Endpoints

The API has the following endpoints:

- `/dashboard` - Access the dashboard
- `/download/:project` - Download the latest release of a project
- `/download/:project/:version` - Download a specific version of a project

> I'm open to suggestions for new endpoints. Feel free to open an issue or a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help, feel free to join the [Discord Server](https://discord.gg/HT47UQXBqG) or open an issue.

# HOW TO PLAY ?!

- Make sure you already have [Node](https://nodejs.org/en/) >= 10 and [NPM](https://www.npmjs.com/get-npm) >= 5
- Uninstall quasar-cli if you have it from < 1.0 versions ( skip this if you never have quasar-cli )
  ```
  npm uninstall -g quasar-cli
  ```
- Install @quasar/cli
  ```
  npm install -g @quasar/cli
  ```
- Clone this repo
  ```
  git clone https://github.com/tikusdugem/efishery-fe-task.git
  ```
- Move to the repo directory
  ```
  cd efishery-fe-task
  ```
- Install dependencies
  ```
  npm install
  ```

## Development

- Create `.dev.env` file (init)
  ```
  nano .dev.env

  # Then add
  API_URL={STEIN_API}
  ```
- Developing for PWA
  ```
  npm run dev:pwa
  ```

## Production

- Create `.prod.env` file (init)
  ```
  nano .prod.env

  # Then add
  API_URL={STEIN_API}
  ```
- Builds for PWA
  ```
  quasar build -m pwa
  ```
- Start a HTTP(S) server
  ```
  quasar serve .
  ```

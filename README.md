# gatsby-plugin-turnstile

[![NPM Package](https://img.shields.io/npm/v/gatsby-plugin-turnstile)](https://www.npmjs.com/package/gatsby-plugin-turnstile)
[![License - MIT](https://img.shields.io/github/license/cometkim/gatsby-plugin-turnstile)](#LICENSE)

A Gatsby plugin to easily integrate [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) client-side.

## Installation

```bash
yarn add gatsby-plugin-turnstile
```

and add it to your `gatsby-config.js` with your Turnstile site key.

```js
{
  plugins: [
    {
      resolve: 'gatsby-plugin-turnstile',
      options: {
        siteKey: `${YOUR_SITE_KEY}`,
      },
    },
  ]
}
```

## Retrieve Site Key

You can use site key you set to gatsby-config. It's provided via static query under the hood.

```js
import { useTurnstileSiteKey } from 'gatsby-plugin-turnstile/src';

const mySiteKey = useTurnstileSiteKey();
```

Use this key to protect your form.

## Use Turnstile API

This plugin provide loader and type definitions for [`window.turnstile` API](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget).

You can await to `window.turnstile` ready state. For example,

```js
await Promise.race(
  window.turnstileReady, // Promise object set by the plugin
  new Promise(res => setTimeout(res, 1000)),
);
```

## LICENSE

MIT

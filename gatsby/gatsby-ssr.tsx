import { type GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([
    <script
      key="turnstile-ready"
      dangerouslySetInnerHTML={{
        __html: `(function(w) {
  var defer = {};
  w.turnstileReady = new Promise(function (res, rej) {
    defer.resolve = res;
    defer.reject = rej;
  })
  w.__GATSBY_PLUGIN_TUNRSTILE_LOADER__ = function (err) {
    if (err) {
      defer.reject();
    } else {
      defer.resolve();
    }
  }
})(window)`,
      }}
    />,
    <script
      key="turnstile-api"
      src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__GATSBY_PLUGIN_TUNRSTILE_LOADER__"
      async
      defer
    />,
  ]);
}

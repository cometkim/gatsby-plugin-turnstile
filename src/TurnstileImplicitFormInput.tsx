import * as React from 'react';

import { useTurnstileReady } from './api';
import { useTurnstileSiteKey } from './siteKey';

type Props = {
  siteKey?: string,
};

export default function TurnstileImplicitFormInput({
  siteKey: overrideSiteKey,
}: Props) {
  const pluginSiteKey = useTurnstileSiteKey();
  const siteKey = overrideSiteKey || pluginSiteKey;
  const turnstileReady = useTurnstileReady();

  const [token, setToken] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!(ref.current && turnstileReady)) {
      return;
    }
    const widgetId = window.turnstile.render(ref.current, {
      siteKey,
      callback: setToken,
    });
    return () => {
      if (widgetId) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [siteKey, turnstileReady]);

  return (
    <>
      {turnstileReady && (
        <div ref={ref} className="cf-turnstile" data-sitekey={siteKey} />
      )}
      {token && (
        <input type="hidden" name="cf-turnstile-response" value={token} />
      )}
      <noscript>
        <div className="cf-turnstile" data-sitekey={siteKey} />
      </noscript>
    </>
  );
}

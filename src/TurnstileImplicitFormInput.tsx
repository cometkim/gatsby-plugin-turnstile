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

  return (
    <>
      {turnstileReady && (
        <div className="cf-turnstile" data-sitekey={siteKey} />
      )}
      <noscript>
        <div className="cf-turnstile" data-sitekey={siteKey} />
      </noscript>
    </>
  );
}

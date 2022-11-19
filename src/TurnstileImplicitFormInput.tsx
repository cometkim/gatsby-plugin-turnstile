import * as React from 'react';

import { useTurnstileReady } from './api';

type Props = {
  siteKey: string,
};

export default function TurnstileImplicitFormInput({ siteKey }: Props) {
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

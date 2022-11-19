import * as React from 'react';

export interface TurnstileAPI {

  /**
   * @return `widgetId | undefined`. If the invocation is successful, the function returns a widgetId (string). If the invocation is unsuccessful, the function returns undefined.
   */
  render(container: string | HTMLElement, params: {
    /**
     * Every widget has a sitekey. This sitekey is associated with the corresponding widget configuration and is created upon the widget creation.
     */
    siteKey: string,

    /**
     * A customer value that can be used to differentiate widgets under the same sitekey in analytics and which is returned upon validation. This can only contain up to 32 alphanumeric characters including `_` and `-`.
     */
    action?: string,

    /**
     * A customer payload that can be used to attach customer data to the challenge throughout its issuance and which is returned upon validation. This can only contain up to 255 alphanumeric characters including `_` and `-`.
     */
    cData?: string,

    /**
     * A JavaScript callback that is invoked upon success of the challenge. The callback is passed a token that can be validated.
     */
    callback?: (token: string) => void,

    /**
     * A JavaScript callback that is invoked when the token expires and does not reset the widget.
     */
    'expired-callback'?: () => void,

    /**
     * A JavaScript callback that is invoked when the challenge expires and resets the widget.
     */
    'timeout-callback'?: () => void,

    /**
     * A JavaScript callback that is invoked when there is a network error.
     */
    'error-callback'?: () => void,

    /**
     * The widget theme. Can take the following values: `"light"`, `"dark"`, `"auto"`.
     *
     * @default "auto". which respects the user preference. This can be forced to light or dark by setting the theme accordingly.
     */
    theme?: 'auto' | 'light' | 'dark',

    /**
     * The tabindex of Turnstile’s iframe for accessibility purposes.
     *
     * @default 0
     */
    tabindex?: number,

    /**
     * A boolean that controls if an input element with the response token is created.
     *
     * @default true
     */
    'response-field'?: boolean,

    /**
     * Name of the input element.
     * @default "cf-turnstile-response"
     */
    'response-field-name'?: string,

    /**
     * The widget size. Can take the following values: `"normal"`, `"compact"`.
     */
    size?: 'normal' | 'compact',

    /**
     * Controls whether the widget should automatically retry to obtain a token if it did not succeed.
     *
     * @default "auto", which will retry automatically. This can be set to `"never"` to disable retry upon failure.
     */
    retry?: 'auto' | 'never',

    /**
     * When retry is set to `"auto"`, `retry-interval` controls the time between retry attempts in milliseconds.
     * Value must be a positive integer less than `900000`, defaults to `8000`.
     */
    'retry-interval'?: number,
  }): string | undefined;


  /**
   * If a given widget has timed out, expired or needs to be reloaded, you can use the `turnstile.reset(widgetId: string)` function to reset the widget.
   */
  reset(widgetId: string): void;

  /**
   * Once a widget is no longer needed, it can be removed from the page using `turnstile.remove(widgetId: string)`. This will not call any callback and will remove all related DOM elements.
   */
  remove(widgetId: string): void;
}

export function useTurnstileReady() {
  const [isReady, ready] = React.useReducer(() => true, false);
  React.useEffect(() => {
    window.turnstileReady.then(ready);
  }, []);
  return isReady;
}

declare global {
  interface Window {
    turnstileReady: Promise<void>;
    turnstile: TurnstileAPI;
  }
}

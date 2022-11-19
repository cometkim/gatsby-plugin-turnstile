import { useTurnstilePluginOptions } from './pluginOptions';

export function useTurnstileSiteKey(): string {
  const pluginOptions = useTurnstilePluginOptions();
  return pluginOptions.siteKey;
}

import { graphql, useStaticQuery } from 'gatsby';

export type PluginOptions = {
  siteKey: string,
};

export function useTurnstilePluginOptions(): PluginOptions {
  const data = useStaticQuery(graphql`
    {
      sitePlugin(name: { eq: "gatsby-plugin-turnstile" }) {
        pluginOptions
      }
    }
  `);

  return data.sitePlugin.pluginOptions;
}

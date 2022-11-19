import { type GatsbyNode } from 'gatsby';

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({
  Joi,
}) => {
  return Joi.object({
    siteKey: Joi.string().required(),
  });
};

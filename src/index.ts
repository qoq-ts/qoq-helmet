import helmet from 'helmet';
import koaHelmet from 'koa-helmet';
import { Next, Slot, WebCtx } from 'qoq';

type HelmetCspDirectiveValue = string | ((ctx: WebCtx) => string);

interface HelmetContentSecurityPolicyDirectives {
    baseUri?: HelmetCspDirectiveValue[];
    childSrc?: HelmetCspDirectiveValue[];
    connectSrc?: HelmetCspDirectiveValue[];
    defaultSrc?: HelmetCspDirectiveValue[];
    fontSrc?: HelmetCspDirectiveValue[];
    formAction?: HelmetCspDirectiveValue[];
    frameAncestors?: HelmetCspDirectiveValue[];
    frameSrc?: HelmetCspDirectiveValue[];
    imgSrc?: HelmetCspDirectiveValue[];
    mediaSrc?: HelmetCspDirectiveValue[];
    objectSrc?: HelmetCspDirectiveValue[];
    pluginTypes?: HelmetCspDirectiveValue[];
    reportUri?: string;
    sandbox?: HelmetCspDirectiveValue[];
    scriptSrc?: HelmetCspDirectiveValue[];
    styleSrc?: HelmetCspDirectiveValue[];
}

interface HelmetContentSecurityPolicyConfiguration {
    reportOnly?: boolean;
    directives?: HelmetContentSecurityPolicyDirectives;
}

export type HelmetOptions = Required<Parameters<typeof helmet>>[number];

export class Helmet extends Slot<Slot.Web> {
  constructor(options?: HelmetOptions) {
    super();
    this.use(koaHelmet(options));
  }
}

class Wrapper extends Slot<Slot.Web> {
  constructor(fn: (ctx: any, next: Next) => any) {
    super();
    this.use(fn);
  }
};

// @ts-expect-error
export const helmets: {
  [key in Exclude<keyof HelmetOptions, 'contentSecurityPolicy'>]: (options?: HelmetOptions[key]) => Slot<Slot.Web>;
} & {
  contentSecurityPolicy: (options?: HelmetContentSecurityPolicyConfiguration) => Slot<Slot.Web>;
} = {};

(Object.keys(koaHelmet) as (keyof HelmetOptions)[]).forEach((key) => {
  helmets[key] = function () {
    // @ts-ignore
    return new Wrapper(koaHelmet[key].apply(null, arguments));
  };
});

# qoq-helmet

Important security headers for qoq based on [koa-helmet](https://github.com/venables/koa-helmet).

[![License](https://img.shields.io/github/license/qoq-ts/qoq-helmet)](https://github.com/qoq-ts/qoq-helmet/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/qoq-helmet)](https://www.npmjs.com/package/qoq-helmet)

# Installation

```bash
yarn add qoq-helmet
```

# Usage

```typescript
import { WebSlotManager } from 'qoq';
import { helmets, Helmet } from 'qoq-helmet';

// This...
export const webSlots = WebSlotManager.use(new Helmet());

// ...is equivalent to this:
export const webSlots = WebSlotManager.use(helmets.contentSecurityPolicy())
  .use(helmets.dnsPrefetchControl())
  .use(helmets.expectCt())
  .use(helmets.frameguard())
  .use(helmets.hidePoweredBy())
  .use(helmets.hsts())
  .use(helmets.ieNoOpen())
  .use(helmets.noSniff())
  .use(helmets.originAgentCluster())
  .use(helmets.permittedCrossDomainPolicies())
  .use(helmets.referrerPolicy())
  .use(helmets.xssFilter());
```

# Options

@see [helmet](https://github.com/helmetjs/helmet#helmet)

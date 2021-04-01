import helmet from 'helmet';
import koaHelmet from 'koa-helmet';
import { Slot } from 'qoq';

export type HelmentType = typeof koaHelmet;

export type HelmetOptions = Required<Parameters<typeof helmet>>[number];

export class Helmet extends Slot<Slot.Web> {
  constructor(options?: HelmetOptions) {
    super();
    this.use(koaHelmet(options));
  }
}

export const helmets: { [key in keyof HelmentType]: HelmentType[key] } = koaHelmet;

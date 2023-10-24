import { config as dotenvConfig } from 'dotenv';
import { GATEWAY_ENV_PATH } from './path';

dotenvConfig({ path: GATEWAY_ENV_PATH });

export const subgraphsPath = [
  // { name: 'Auth', url: process.env.GRAPHQL_USER_URL }
  { name: 'Catalog', url: process.env.GRAPHQL_CATALOG_URL }
  // { name: 'Order', url: process.env.GRAPHQL_ORDER_URL },
  // { name: 'Basket', url: process.env.GRAPHQL_BASKET_URL }
];

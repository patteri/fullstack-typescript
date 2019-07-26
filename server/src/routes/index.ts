import { Router } from 'express';

import * as itemApi from './item';

const registerRoutes = (router: Router) => {
  itemApi.registerApi(router);
};

export default registerRoutes;

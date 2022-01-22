/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 21:07:58 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-22 22:27:42
 */

import { RequestHandler } from 'express';


type RouteConfig = {
  path: string;
  method: 'get' | 'post';
  handler: RequestHandler;
};

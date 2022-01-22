/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 22:55:20 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-22 22:57:01
 */

type DeployBody = {
  'data[name]': string;
  'data[raw]': Buffer;
  admin: string;
  pwd: string;
};

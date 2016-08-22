/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-13
 * @author Liang <liang@maichong.it>
 */

import service from '../';
import Upload from '../sleds/Upload';

export default async function (ctx) {
  if (ctx.method !== 'POST') service.error(400);
  let auth = service.config('auth');
  if (auth && !ctx.user) service.error(403);
  let body = ctx.state.body || ctx.request.body;
  let file;
  if (ctx.files) {
    file = ctx.files.file;
  }

  let image = await Upload.run({
    user: ctx.user,
    file,
    ...body
  });

  ctx.body = image.pic;
}

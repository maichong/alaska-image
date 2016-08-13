/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-13
 * @author Liang <liang@maichong.it>
 */

import service from '../';
import Image from '../models/Image';

export default async function (ctx) {
  if (ctx.method !== 'POST') service.error(400);
  let auth = service.config('auth');
  if (auth && !ctx.user) service.error(403);
  let body = ctx.state.body || ctx.request.body;
  let file;
  if (ctx.files) {
    file = ctx.files.file;
  }
  if (!file && body.data) {
    let data = body.data || ctx.request.body.data;
    if (data) {
      if (Buffer.isBuffer(data)) {
        //buffer
        file = body.data;
      } else if (typeof data === 'string') {
        //base64
        file = new Buffer(data, 'base64');
      }
    }
  }
  if (!file) service.error('No file found');
  if (body.filename) {
    file.filename = body.filename;
  }
  if (body.ext) {
    file.ext = body.ext;
  }
  if (body.mime || body.mimeType) {
    file.mime = body.mime || body.mimeType;
  }
  let record = new Image({ user: ctx.user });
  await record._.pic.upload(file);
  await record.save();
  ctx.body = record.pic;
}

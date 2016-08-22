/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-22
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import request from 'request-async';
import mime from 'mime';
import path from 'path';
import Image from '../models/Image';

export default class Upload extends alaska.Sled {
  async exec() {
    let { file, data, url, user, headers, filename, ext, mimeType } = this.data;

    if (!file && data) {
      if (Buffer.isBuffer(data)) {
        //buffer
        file = data;
      } else if (typeof data === 'string') {
        //base64
        file = new Buffer(data, 'base64');
      }
    }

    if (!file && url) {
      let res = await request({ url, headers, encoding: null });
      file = res.body;
      if (!filename) {
        filename = path.basename(url);
      }
      if (!mimeType) {
        mimeType = mime.lookup(url);
      }
    }
    if (!file) alaska.error('No file found');
    if (filename) {
      file.filename = filename;
    }
    if (ext) {
      file.ext = ext;
    }
    if (mimeType) {
      file.mimeType = mimeType;
    }
    let record = new Image({ user });
    await record._.pic.upload(file);
    if (record.pic._id) {
      record._id = record.pic._id;
    }
    await record.save();
    return record;
  }
}

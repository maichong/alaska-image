/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-13
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * @class ImageService
 */
class ImageService extends alaska.Service {
  constructor(options) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-image';
    super(options);
  }
}

export default new ImageService();

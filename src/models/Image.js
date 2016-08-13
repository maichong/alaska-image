/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-13
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Image extends alaska.Model {

  static label = 'Image';
  static icon = 'picture-o';
  static defaultColumns = 'pic user createdAt';
  static defaultSort = '-createdAt';
  static noremove = true;

  static fields = {
    pic: {
      label: 'Picture',
      type: 'image',
      required: true
    },
    user: {
      label: 'User',
      ref: 'alaska-user.User',
      optional: true
    },
    createdAt: {
      label: 'Created At',
      type: Date
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}

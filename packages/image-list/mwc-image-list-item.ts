import {customElement} from 'lit-element';

import {ImageListItemBase} from './mwc-image-list-item-base';
import {style} from './mwc-image-list-item-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-image-list-item': ImageListItem;
  }
}

/** @soyCompatible */
@customElement('mwc-image-list-item')
export class ImageListItem extends ImageListItemBase {
  static styles = style;
}

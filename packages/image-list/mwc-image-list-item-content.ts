import {customElement} from 'lit-element';

import {ImageListItemContentBase} from './mwc-image-list-item-content-base';
import {style} from './mwc-image-list-item-content-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-image-list-item-content': ImageListItemContent;
  }
}

/** @soyCompatible */
@customElement('mwc-image-list-item-content')
export class ImageListItemContent extends ImageListItemContentBase {
  static styles = style;
}

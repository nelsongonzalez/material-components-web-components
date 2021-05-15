import {customElement} from 'lit-element';

import {ImageListBase} from './mwc-image-list-base';
import {style} from './mwc-image-list-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-image-list': ImageList;
  }
}

/** @soyCompatible */
@customElement('mwc-image-list')
export class ImageList extends ImageListBase {
  static styles = style;
}

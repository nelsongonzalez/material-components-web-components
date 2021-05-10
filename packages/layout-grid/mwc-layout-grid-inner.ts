import {customElement} from 'lit-element';

import {LayoutGridInnerBase} from './mwc-layout-grid-inner-base';
import {style} from './mwc-layout-grid-inner-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-layout-grid-inner': LayoutGridInner;
  }
}

/** @soyCompatible */
@customElement('mwc-layout-grid-inner')
export class LayoutGridInner extends LayoutGridInnerBase {
  static styles = style;
}

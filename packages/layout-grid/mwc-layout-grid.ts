import {customElement} from 'lit-element';

import {LayoutGridBase} from './mwc-layout-grid-base';
import {style} from './mwc-layout-grid-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-layout-grid': LayoutGrid;
  }
}

/** @soyCompatible */
@customElement('mwc-layout-grid')
export class LayoutGrid extends LayoutGridBase {
  static styles = style;
}

import {customElement} from 'lit-element';

import {LayoutGridCellBase} from './mwc-layout-grid-cell-base';
import {style} from './mwc-layout-grid-cell-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-layout-grid-cell': LayoutGridCell;
  }
}

/** @soyCompatible */
@customElement('mwc-layout-grid-cell')
export class LayoutGridCell extends LayoutGridCellBase {
  static styles = style;
}

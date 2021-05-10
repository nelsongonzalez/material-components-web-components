import {html, LitElement, property} from 'lit-element';

export type GridPosition = 'center'|'left'|'right';

/** @soyCompatible */
export class LayoutGridBase extends LitElement {
  @property({reflect: true, type: String}) position: GridPosition = 'center';

  @property({reflect: true, type: Boolean}) fixedColumnWidth: Boolean = false;

  render() {
    return html`<slot></slot>`;
  }
}

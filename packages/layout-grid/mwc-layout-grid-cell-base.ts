import {html, LitElement, property} from 'lit-element';

export type DesktopSpan = 1|2|3|4|5|6|7|8|9|10|11|12;
export type TabletSpan = 1|2|3|4|5|6|7|8;
export type PhoneSpan = 1|2|3|4;
export type CellPosition = 'top'|'middle'|'bottom';

export class LayoutGridCellBase extends LitElement {
  @property({type: Number, reflect: true}) span?: DesktopSpan;

  @property({type: Number, reflect: true}) desktop?: DesktopSpan;

  @property({type: Number, reflect: true}) tablet?: TabletSpan;

  @property({type: Number, reflect: true}) phone?: PhoneSpan;

  @property({type: Number, reflect: true}) order?: DesktopSpan;

  @property({type: String, reflect: true}) position?: CellPosition;


  render() {
    return html`<slot></slot>`;
  }
}

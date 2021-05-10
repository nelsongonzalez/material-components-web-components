import {html, LitElement} from 'lit-element';

export class LayoutGridInnerBase extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

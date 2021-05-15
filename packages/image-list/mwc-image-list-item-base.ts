import {html, LitElement} from 'lit-element';

/** @soyCompatible */
export class ImageListItemBase extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

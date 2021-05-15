import {html, LitElement} from 'lit-element';

/** @soyCompatible */
export class ImageListItemContentBase extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

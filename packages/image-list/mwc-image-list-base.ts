import {html, LitElement} from 'lit-element';

/** @soyCompatible */
export class ImageListBase extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

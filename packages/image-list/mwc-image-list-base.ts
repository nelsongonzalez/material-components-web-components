import {html, LitElement, property} from 'lit-element';

export type ImageListColumns = 6|5|4|3|2|1;

/** @soyCompatible */
export class ImageListBase extends LitElement {
  @property({type: Number}) columns: ImageListColumns = 4;

  render() {
    return html`<slot></slot>`;
  }
}

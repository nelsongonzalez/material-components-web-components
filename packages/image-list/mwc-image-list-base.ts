import {html, LitElement, property} from 'lit-element';

export type ImageListColumns = 6|5|4|3|2|1;

/** @soyCompatible */
export class ImageListBase extends LitElement {
  // @property({type: Number}) columns: ImageListColumns = 4;
  @property({type: Number}) desktop: ImageListColumns = 4;
  @property({type: Number}) tablet: ImageListColumns = 3;
  @property({type: Number}) phone: ImageListColumns = 2;

  render() {
    return html`<slot></slot>`;
  }
}

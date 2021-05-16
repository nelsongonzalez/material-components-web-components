import {html, LitElement, property} from 'lit-element';

export type Aspect = '1:1'|'16:9';

/** @soyCompatible */
export class ImageListItemBase extends LitElement {
  @property({type: String, reflect: true}) aspect: Aspect = '1:1';

  render() {
    return html`
      <div class="mdc-image-list__image-aspect-container">
        <slot></slot>
      </div>
    `;
  }
}

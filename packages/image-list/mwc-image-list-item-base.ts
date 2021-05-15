import {html, LitElement} from 'lit-element';

/** @soyCompatible */
export class ImageListItemBase extends LitElement {
  render() {
    return html`
      <div class="mdc-image-list__image-aspect-container">
        <slot></slot>
      </div>
    `;
  }
}

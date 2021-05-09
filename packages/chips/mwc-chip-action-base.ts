/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import '@material/mwc-ripple/mwc-ripple';
import '@material/mwc-icon/mwc-icon';

import {MDCChipActionAdapter} from '@material/chips/action/adapter';
import {Attributes} from '@material/chips/action/constants';
import {Events} from '@material/chips/action/constants';
import MDCChipActionFoundation from '@material/chips/action/foundation';
import MDCChipPrimaryActionFoundation from '@material/chips/action/primary-foundation';
import {MDCChipActionInteractionEventDetail, MDCChipActionNavigationEventDetail} from '@material/chips/action/types';
import {BaseElement} from '@material/mwc-base/base-element';
import {html, property, query} from 'lit-element';
import {nothing} from 'lit-html';
import {ifDefined} from 'lit-html/directives/if-defined';

export class ChipActionBase extends BaseElement {
  @query('.mdc-evolution-chip__action') protected mdcRoot!: HTMLElement;

  protected mdcFoundation!: MDCChipActionFoundation;

  protected readonly mdcFoundationClass = MDCChipPrimaryActionFoundation;

  @property() label = '';

  // @property({type: Boolean}) selectable = true;
  @property({type: Boolean, reflect: true, attribute: 'selectable'})
  get selectable(): boolean {
    return this._selectable;
  }

  set selectable(value: boolean) {
    const oldValue = this._selectable;
    this._selectable = value;
    this.requestUpdate('selectable', oldValue);
  }

  @property({type: Boolean, reflect: true, attribute: 'deletable'})
  get deletable(): boolean {
    return this._deletable;
  }

  @property({type: String}) href = '';

  @property({type: String}) leadingIcon = '';

  protected _selectable = false;

  protected _deletable = false;

  protected createAdapter(): MDCChipActionAdapter {
    return {
      emitEvent: (eventName: Events, eventDetail) => {
        console.log(eventName, eventDetail);
        switch (eventName) {
          case Events.INTERACTION: {
            const detail = eventDetail as MDCChipActionInteractionEventDetail;
            console.log(detail);
            this.dispatchEvent(new CustomEvent(
                Events.INTERACTION, {detail, bubbles: true, composed: true}));
            break;
          }
          case Events.NAVIGATION: {
            const detail = eventDetail as MDCChipActionNavigationEventDetail;
            console.log(detail);
            this.dispatchEvent(new CustomEvent(
                Events.NAVIGATION, {detail, bubbles: true, composed: true}));
            break;
          }
        }
      },

      focus: () => {
        this.mdcRoot.focus();
      },

      getAttribute: (attr: Attributes) => {
        return this.mdcRoot.getAttribute(attr);
      },

      getElementID: () => {
        return this.mdcRoot.id;
      },

      removeAttribute: (attr: Attributes) => {
        this.mdcRoot.removeAttribute(attr);
      },

      setAttribute: (attr: Attributes, value: string) => {
        this.mdcRoot.setAttribute(attr, value);
      },
    };
  }

  render() {
    if (this.href) {
      return html`
      <a
          class="mdc-evolution-chip__action mdc-evolution-chip__action--primary"
          href="${this.href}"
          tabindex="0"
          data-mdc-deletable="${
          ifDefined(this.deletable === true ? 'true' : undefined)}">
        <mwc-ripple class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></mwc-ripple>
        ${this.renderLeadingGraphic()}
        <span class="mdc-evolution-chip__text-label">
          ${this.renderLabel()}
        </span>
      </a>
      `;
    }

    return this.selectable ?
        html`
      <span
          class="mdc-evolution-chip__action mdc-evolution-chip__action--primary"
          role="option"
          aria-selected="false"
          tabindex="0"
          data-mdc-deletable="${
            ifDefined(this.deletable === true ? 'true' : undefined)}">
        <mwc-ripple class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></mwc-ripple>
        ${this.renderLeadingGraphic()}
        <span class="mdc-evolution-chip__text-label">
          ${this.renderLabel()}
        </span>
      </span>
      ` :
        html`
        <button
          class="mdc-evolution-chip__action mdc-evolution-chip__action--primary"
          type="button"
          tabindex="0"
          data-mdc-deletable="${
            ifDefined(this.deletable === true ? 'true' : undefined)}"
        >
          <mwc-ripple class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></mwc-ripple>
          ${this.renderLeadingGraphic()}
          <span class="mdc-evolution-chip__text-label">
            ${this.renderLabel()}
          </span>
        </button>
      `;
  }

  renderLabel() {
    return html`${this.label}`;
  }

  renderLeadingGraphic() {
    if (this.selectable) {
      return html`
        <span class="mdc-evolution-chip__graphic">
          ${this.renderLeadingIcon()}
          <span class="mdc-evolution-chip__checkmark">
            <svg class="mdc-evolution-chip__checkmark-svg" viewBox="-2 -3 30 30">
              <path class="mdc-evolution-chip__checkmark-path"
                    fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
            </svg>
          </span>
        </span>`;
    }

    return this.leadingIcon ? html`
        <span class="mdc-evolution-chip__graphic">
          ${this.renderLeadingIcon()}
        </span>
      ` :
                              undefined;
  }

  renderLeadingIcon() {
    return this.leadingIcon ? html`
      <mwc-icon class="mdc-evolution-chip__icon mdc-evolution-chip__icon--primary material-icons">
      ${this.leadingIcon}
      </mwc-icon>
    ` :
                              nothing;
  }
}

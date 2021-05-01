/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

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

import {Ripple} from '@material/mwc-ripple/mwc-ripple';
import {RippleHandlers} from '@material/mwc-ripple/ripple-handlers';
import {html, LitElement, property, queryAsync, internalProperty, TemplateResult} from 'lit-element';

export class CardPrimaryActionBase extends LitElement {
  @property() label = '';

  @queryAsync('mwc-ripple') ripple!: Promise<Ripple|null>;

  @internalProperty() protected shouldRenderRipple = false;

  protected rippleHandlers = new RippleHandlers(() => {
    this.shouldRenderRipple = true;
    return this.ripple;
  });

  /** @soyTemplate */
  protected renderRipple(): TemplateResult|string {
    return this.shouldRenderRipple ?
        html`<mwc-ripple class="mdc-card__ripple ripple"></mwc-ripple>` :
        '';
  }

  createRenderRoot() {
    return this.attachShadow({mode: 'open', delegatesFocus: true});
  }

  render() {
    return html`
      <div class="mdc-card__primary-action"
        tabindex="0"
        aria-label="${this.label}">
          ${this.renderRipple()}
          <slot></slot>
      </div>`;
  }
}

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

import {ActionType} from '@material/chips/action/constants';
import {MDCChipAdapter} from '@material/chips/chip/adapter.js';
import {Events} from '@material/chips/chip/constants';
import {MDCChipFoundation} from '@material/chips/chip/foundation.js';
import {MDCChipInteractionEventDetail} from '@material/chips/chip/types';
import {MDCChipAnimationEventDetail} from '@material/chips/chip/types';
import {MDCChipNavigationEventDetail} from '@material/chips/chip/types';
import {BaseElement} from '@material/mwc-base/base-element';
import {html, property, query} from 'lit-element';
import { ChipAction } from './mwc-chip-action';

// used for generating unique id for each tab
let chipIdCounter = 0;

export class ChipBase extends BaseElement {
  @query('.mdc-evolution-chip') protected mdcRoot!: HTMLElement;

  protected mdcFoundation!: MDCChipFoundation;

  protected readonly mdcFoundationClass = MDCChipFoundation;

  @property({type: Array}) actionTypes = [ActionType.UNSPECIFIED];

  @property({type: Boolean}) primarySelected = false;

  @query('slot[name="primary"]')
  protected primaryActionElement!: HTMLSlotElement|null;

  @query('slot[name="trailing"]')
  protected trailingActionElement!: HTMLElement|null;

  protected createAdapter(): MDCChipAdapter {
    return {
      addClass: (className) => {
        this.mdcRoot.classList.add(className);
      },

      emitEvent: (eventName, eventDetail) => {
        // TODO implement
        console.log(eventName, eventDetail);
        switch (eventName) {
          case Events.INTERACTION: {
            const detail = eventDetail as MDCChipInteractionEventDetail;
            console.log(detail);
            this.dispatchEvent(new CustomEvent(
              Events.INTERACTION, {detail, bubbles: true, composed: true}));
            break;
          }
          case Events.ANIMATION: {
            const detail = eventDetail as MDCChipAnimationEventDetail;
            console.log(detail);
            this.dispatchEvent(new CustomEvent(
              Events.ANIMATION, {detail, bubbles: true, composed: true}));
            break;
          }
          case Events.NAVIGATION: {
            const detail = eventDetail as MDCChipNavigationEventDetail;
            console.log(detail);
            this.dispatchEvent(new CustomEvent(
              Events.NAVIGATION, {detail, bubbles: true, composed: true}));
            break;
          }
        }
      },

      getActions: () => {
        return this.actionTypes;
      },

      getElementID: () => {
        return this.mdcRoot.id;
      },

      getOffsetWidth: () => {
        return this.mdcRoot.offsetWidth;
      },

      hasClass: (className) => {
        return this.mdcRoot.classList.contains(className);
      },

      isActionSelectable: (action) => {
        if (action === ActionType.PRIMARY) {
          if (this.primaryActionElement instanceof ChipAction) {
            return (this.primaryActionElement as ChipAction).selectable;
          }
        }
        return false;
      },

      isActionSelected: (action) => {
        if (action === ActionType.PRIMARY) {
          if (this.primaryActionElement instanceof ChipAction) {
            return this.primarySelected;
          }
        }
        return false;
      },

      isActionFocusable: (action) => {
        if (action === ActionType.PRIMARY) {
          return true;
        }
        return false;
      },

      isActionDisabled: (_action) => {
        return false;
      },

      removeClass: (className) => {
        this.mdcRoot.classList.remove(className);
      },

      setActionDisabled: (_action, _isDisabled) => {},

      setActionFocus: (_action, _behavior) => {},

      setActionSelected: (action, isSelected) => {
        if (action === ActionType.PRIMARY) {
          this.primarySelected = isSelected;
        }
      },

      setStyleProperty: (propertyName, value) =>
          this.mdcRoot.style.setProperty(propertyName, value),

      getAttribute: (name: string) => this.mdcRoot.getAttribute(name),

      isRTL: () => getComputedStyle(this.mdcRoot).direction === 'rtl',
    };
  }

  focusPrimaryAction(actionType, focusBehavior) {
    this.mdcFoundation.setActionFocus(actionType, focusBehavior);
  }

  isActionFocusable(actionType): boolean {
    return this.mdcFoundation.isActionFocusable(actionType);
  }

  isActionSelectable(actionType): boolean {
    return this.mdcFoundation.isActionSelectable(actionType);
  }

  isActionSelected(actionType): boolean {
    return this.mdcFoundation.isActionSelected(actionType);
  }

  setActionFocus(actionType, focus) {
    this.mdcFoundation.setActionFocus(actionType, focus);
  }

  setActionSelected(actionType, isSelected) {
    this.mdcFoundation.setActionSelected(actionType, isSelected);
  }

  getActions(): ActionType[] {
    return this.actionTypes;
  }

  protected firstUpdated() {
    super.firstUpdated();
    // create an unique id
    this.id = this.id || `mdc-evolution-chip-${++chipIdCounter}`;
    if (this.primaryActionElement !== null ||
        this.trailingActionElement !== null) {
      this.actionTypes = [];
      if (this.primaryActionElement !== null) {
        this.actionTypes.push(ActionType.PRIMARY);
      }
      if (this.trailingActionElement !== null) {
        this.actionTypes.push(ActionType.TRAILING);
      }
    }
    console.log(this.actionTypes);
  }

  render() {
    return html`
      <span
        class="mdc-evolution-chip mdc-evolution-chip--filter"
        @transitionend=${this.handleTransitionEnd}
      >
        <slot name="primary"></slot>
        <slot name="trailing"></slot>
      </span>
    `;
  }

  private handleTransitionEnd(_e: TransitionEvent) {
    this.mdcFoundation.handleTransitionEnd();
  }
}

export type ChipType = 'action'|'input'|'filter'|'choise';

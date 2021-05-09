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

import {MDCChipSetAdapter} from '@material/chips/chip-set/adapter.js';
import {Events} from '@material/chips/chip-set/constants';
import {MDCChipSetFoundation} from '@material/chips/chip-set/foundation.js';
import {MDCChipSetSelectionEventDetail} from '@material/chips/chip-set/types';
import {MDCChipSetRemovalEventDetail} from '@material/chips/chip-set/types';
import {MDCChipSetInteractionEventDetail} from '@material/chips/chip-set/types';
import {announce} from '@material/dom/announce.js';
import {BaseElement} from '@material/mwc-base/base-element';
import {html, property, query} from 'lit-element';
import {ifDefined} from 'lit-html/directives/if-defined';

import {ChipBase, ChipType} from './mwc-chip-base.js';
import {Chip} from './mwc-chip.js';

let chipIdCounter = 0;

export class ChipSetBase extends BaseElement {
  @query('.mdc-evolution-chip-set') protected mdcRoot!: HTMLElement;

  @query('slot') protected chipsSlot!: HTMLElement;

  protected mdcFoundation!: MDCChipSetFoundation;

  protected readonly mdcFoundationClass = MDCChipSetFoundation;

  @property()
  // @observer(function(this: ChipSetBase, value: ChipType) {
  //   for (const chip of this.chipsArray) {
  //     chip.type = value;
  //   }
  // })
  type?: ChipType;

  get chips(): ReadonlyArray<ChipBase> {
    return this.chipsArray.slice();
  }

  private chipsArray: ChipBase[] = [];

  private chipsObserver = new MutationObserver(() => this.syncChips());

  protected createAdapter(): MDCChipSetAdapter {
    return {
      announceMessage: (message) => {
        announce(message);
      },

      emitEvent: (eventName, eventDetail) => {
        // TODO implement
        console.log(eventName, eventDetail);
        switch (eventName) {
          case Events.INTERACTION: {
            const detail = eventDetail as MDCChipSetInteractionEventDetail;
            this.dispatchEvent(new CustomEvent(
                Events.INTERACTION, {detail, bubbles: true, composed: true}));
            break;
          }
          case Events.REMOVAL: {
            const detail = eventDetail as MDCChipSetRemovalEventDetail;
            this.dispatchEvent(new CustomEvent(
                Events.REMOVAL, {detail, bubbles: true, composed: true}));
            break;
          }
          case Events.SELECTION: {
            const detail = eventDetail as MDCChipSetSelectionEventDetail;
            this.dispatchEvent(new CustomEvent(
                Events.SELECTION, {detail, bubbles: true, composed: true}));
            break;
          }
        }
      },

      getAttribute: (attrName) => this.mdcRoot.getAttribute(attrName),

      getChipActionsAtIndex: (index) => {
        const chip = this.chipsArray[index];
        if (chip) {
          return chip.getActions();
        }
        return [];
      },

      removeChipAtIndex: (index) => {
        const chip = this.chipsArray[index];
        if (chip) {
          this.mdcRoot.removeChild(chip);
          this.chipsArray.splice(index, 1);
        }
      },

      getChipIdAtIndex: (index) => this._getChip(index).id,

      isChipFocusableAtIndex: (index, actionType) => {
        const chip = this.chipsArray[index];
        if (chip) {
          return chip.isActionFocusable(actionType);
        }
        return false;
      },

      isChipSelectableAtIndex: (index, actionType) => {
        const chip = this.chipsArray[index];
        if (chip) {
          return chip.isActionSelectable(actionType);
        }
        return false;
      },

      isChipSelectedAtIndex: (index, actionType) => {
        const chip = this.chipsArray[index];
        if (chip) {
          return chip.isActionSelected(actionType);
        }
        return false;
      },

      startChipAnimationAtIndex: (_index, _animation) => {
        // void
      },

      setChipSelectedAtIndex: (index, actionType, isSelected) => {
        const chip = this.chipsArray[index];
        if (chip) {
          chip.setActionSelected(actionType, isSelected);
        }
      },

      getChipIndexById: (chipId) => {
        for (let i = 0; i < this.chipsArray.length; i++) {
          if (this.chipsArray[i].id === chipId) {
            return i;
          }
        }

        return -1;
      },

      setChipFocusAtIndex: (index, actionType, focusBehavior) => {
        const chip = this.chipsArray[index];
        if (chip) {
          chip.setActionFocus(actionType, focusBehavior);
        }
      },

      getChipCount: () => this.chipsArray.length
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.chipsObserver.observe(this, {childList: true, subtree: true});

    this.syncChips();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.chipsObserver.disconnect();
  }

  render() {
    const isFilter = this.type === 'filter';
    return html`
      <span class="mdc-evolution-chip-set"
           role="${isFilter ? 'listbox' : 'grid'}"
           aria-orientation="${ifDefined(isFilter ? 'horizontal' : undefined)}"
           aria-multiselectable="${ifDefined(isFilter ? 'false' : undefined)}"
      >
        <span class="mdc-evolution-chip-set__chips" role="presentation">
          <slot></slot>
        </span>
      </span>`;
  }

  protected syncChips() {
    const chips = this.queryChips();

    chips.forEach((chip, _index) => {
      // chip.type = this.type;
      chip.id = chip.id || this.nextChipId();
      // if (chip.selected) {
      //   // INFO Only supported for listbox chip sets.
      //   this.mdcFoundation.setChipSelected(index, ActionType.PRIMARY, true);
      // }
    });

    this.chipsArray = chips;
  }

  protected nextChipId() {
    return `mwc-chip-${++chipIdCounter}`;
  }

  protected queryChips() {
    const chips: ChipBase[] = [];
    const collectChips = (root: Element) => {
      for (const child of Array.from(root.children)) {
        if (child instanceof ChipBase) {
          chips.push(child);
        } else {
          collectChips(child);
        }
      }
    };

    collectChips(this);
    return chips;
  }

  // TODO(sorvell): probably want to memoize this and use a `slotChange` event
  protected _getChips() {
    return (this.chipsSlot as HTMLSlotElement)
               .assignedNodes({flatten: true})
               .filter((e: Node) => e instanceof Chip) as Chip[];
  }

  protected _getChip(index: number) {
    return this._getChips()[index];
  }

  /*
  @MDCChipSet:interaction=${this.handleChipInteraction}
           @MDCChipSet:removal=${this.handleChipRemoval}
           @MDCChipSet:selection=${this.handleChipSelection}
   */

  /* private handleChipInteraction(e: ChipInteractionEvent) {
    this.mdcFoundation.handleChipInteraction(e);
  }

  private handleChipRemoval(e: ChipNavigationEvent) {
    this.mdcFoundation.handleChipNavigation(e);
  }

  private handleChipSelection(e: ChipAnimationEvent) {
    this.mdcFoundation.handleChipAnimation(e);
  } */
}

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import TpkInput from '@triptyk/ember-input/components/tpk-input';
import { tracked } from 'tracked-built-ins';

export interface SearchBarSignature {
  Args: {
    label: string;
    placeholder?: string;
    onSearch: (value: string, e?: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class PropertyCard extends Component<SearchBarSignature> {
  @tracked searchValue = '';
  @action
  updateSearchValue(v: string | number | Date | null) {
    if (!v) return;
    this.searchValue = v.toString();
  }

  @action
  onSearch(e: Event) {
    e.preventDefault();
    this.args.onSearch(this.searchValue, e);
  }
  <template>
    <TpkInput
      @label={{@label}}
      @value={{this.searchValue}}
      @onChange={{this.updateSearchValue}}
      @type="search"
      class="search_bar w-full"
      data-test-search-input="search"
      ...attributes
      as |TI|
    >
      <form {{on "submit" this.onSearch}}>
        <TI.Label>
          {{@label}}
        </TI.Label>
        <TI.Input
          placeholder={{@placeholder}}
          aria-autocomplete="none"
          autocomplete="off"
          autofill="off"
        />
        <button type="submit" data-test-search-submit>
          <span>Rechercher</span>
        </button>
      </form>
    </TpkInput>
  </template>
}

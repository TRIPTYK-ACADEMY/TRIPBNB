import TpkValidationDatepicker from '@triptyk/ember-input-validation/components/tpk-validation-datepicker';
import InputsErrorValidation from 'ember-boilerplate/components/inputs/error-validation';

import type { TOC } from '@ember/component/template-only';
import type { TpkValidationDatepickerComponentSignature } from '@triptyk/ember-input-validation/components/tpk-validation-datepicker';

interface InputsValidationComponentSignature {
  Element: HTMLDivElement;
  Args: TpkValidationDatepickerComponentSignature['Args'] & {
    inputClass?: string;
  };
  Blocks: {
    default: [];
  };
}

const InputsValidationComponent: TOC<InputsValidationComponentSignature> = <template>
  <TpkValidationDatepicker
    @changeset={{@changeset}}
    @validationField={{@validationField}}
    @label={{@label}}
    @locale="fr"
    @minDate={{@minDate}}
    ...attributes
    as |TI|
  >
    <TI.Label>
      {{@label}}
    </TI.Label>
    <div class="relative">
      <TI.Input
        @placeholder={{@placeholder}}
        class={{@inputClass}}
        aria-autocomplete="none"
        autocomplete="off"
        autofill="off"
      />
      <img
        src="/assets/icons/calendar-gray.svg"
        alt="icon datepicker"
        class="calendar-icon absolute w-5 top-0 bottom-0 right-6 my-auto pointer-events-none"
      />
    </div>
    <InputsErrorValidation @errors={{TI.errors}} />
  </TpkValidationDatepicker>
</template>;

export default InputsValidationComponent;

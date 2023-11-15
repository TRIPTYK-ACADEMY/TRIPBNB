import Component from '@glimmer/component';
import { concat } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';

import InputsDatepickerValidation from 'ember-boilerplate/components/inputs/datepicker-validation';
import InputsValidation from 'ember-boilerplate/components/inputs/input-validation';
import InputsSelectValidation from 'ember-boilerplate/components/inputs/select-validation';
import { tracked } from 'tracked-built-ins';

import YupForm from './yup-form';

import type RouterService from '@ember/routing/router-service';
import type { BookingChangeset } from 'ember-boilerplate/changesets/booking';
import type { Promisable } from 'type-fest';
import type { Schema } from 'yup';
export interface FormsBookingSignature {
  Args: {
    changeset: BookingChangeset;
    saveFunction: (changeset: BookingChangeset) => Promisable<unknown>;
    validationSchema: Schema;
    maxGuests: number;
    disabledDates: { from: string; to: string }[];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLFormElement;
}

export default class FormsBookingComponent extends Component<FormsBookingSignature> {
  @service declare router: RouterService;
  @tracked guestsOptions: number[] = [];

  toString = (value: unknown): string => {
    return String(value ?? '');
  };
  inc = (value: number): number => {
    return value + 1;
  };
  constructor(owner: unknown, args: FormsBookingSignature['Args']) {
    super(owner, args);

    const options = [];

    for (let i = 1; i <= args.maxGuests; i++) {
      options.push(i);
    }

    this.guestsOptions = options;
  }

  get minDate() {
    return this.args.changeset.get('startAt');
  }

  get guestsNumber() {
    return this.args.changeset.get('number');
  }

  get guests() {
    return this.args.changeset.get('guests');
  }

  @action
  setGuestNumber(value: unknown) {
    const number = value as number;

    this.args.changeset.set('number', number);

    if (number > 1) {
      let guestNumber = number - 1;
      let currentGuests = [...this.args.changeset.get('guests')];

      const difference = guestNumber - currentGuests.length;

      if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          currentGuests.push({ lastName: '', firstName: '' });
        }
      } else if (difference < 0) {
        currentGuests.splice(difference);
      }

      this.args.changeset.set('guests', [...currentGuests]);
    } else {
      this.args.changeset.set('guests', []);
    }
  }

  @action
  async backList() {
    await this.router.transitionTo('index');
  }

  <template>
    <YupForm
      class="bg-white px-6 py-8 rounded-md"
      @onSubmit={{@saveFunction}}
      @changeset={{@changeset}}
      @validationSchema={{@validationSchema}}
      ...attributes
      data-test-form-booking
    >
      <button type="button" class="flex items-center space-x-4 group" {{on "click" this.backList}}>
        <img
          loading="lazy"
          src="/assets/icons/arrow-left.svg"
          class="h-6 duration-200 group-hover:translate-x-1"
        />
        <span>Retour</span>
      </button>
      <fieldset class="grid grid-cols-12 gap-x-10 gap-y-8">
        <h3 class="text-2xl font-semibold mt-8 mb-2 col-span-12">Votre voyage</h3>
        <InputsDatepickerValidation
          @changeset={{@changeset}}
          @validationField="startAt"
          @label="Arrivée"
          {{!-- @disable={{@disabledDates}} --}}
          class="input_block col-span-6"
        />
        {{#if this.minDate}}
          <InputsDatepickerValidation
            @changeset={{@changeset}}
            @validationField="endAt"
            @label="Départ"
            @minDate={{this.minDate}}
            {{!-- @disable={{@disabledDates}} --}}
            class="input_block col-span-6"
          />
        {{else}}
          <div class="col-span-4"></div>
        {{/if}}
        <InputsSelectValidation
          @options={{this.guestsOptions}}
          @onChange={{this.setGuestNumber}}
          @changeset={{@changeset}}
          @validationField="number"
          @label="Voyageurs"
          @defaultText="Sélectionner le nombre de voyageur"
          class="input_block col-span-12"
        >
          {{! @glint-expect-error }}
          <:option as |o|>
            {{o.option}}
            voyageurs
          </:option>
          <:selected as |s|>
            {{this.toString s}}
            voyageurs
          </:selected>
          <:notSelected>
            Sélectionner le nombre de voyageur
          </:notSelected>
        </InputsSelectValidation>
      </fieldset>
      <fieldset class="grid grid-cols-12 gap-x-10 gap-y-8">
        <h3 class="text-2xl font-semibold mt-8 mb-2 col-span-12">Vos informations</h3>
        <InputsValidation
          @label="Nom"
          @changeset={{@changeset}}
          @validationField="lastName"
          class="input_block col-span-4"
          data-test-input="lastName"
        />
        <InputsValidation
          @label="Prénom"
          @changeset={{@changeset}}
          @validationField="firstName"
          class="input_block col-span-4"
          data-test-input="firstName"
        />
        <InputsValidation
          @label="Email"
          @changeset={{@changeset}}
          @validationField="email"
          class="input_block col-span-4"
          data-test-input="email"
        />
        <h3 class="text-xl font-medium my-2 col-span-12">Addresses</h3>
        <InputsValidation
          @label="Rue"
          @changeset={{@changeset}}
          @validationField="address.street"
          class="input_block col-span-8"
          data-test-input="street"
        />
        <InputsValidation
          @label="Numéro"
          @changeset={{@changeset}}
          @validationField="address.number"
          class="input_block col-span-4"
          data-test-input="number"
        />
        <InputsValidation
          @label="Ville"
          @changeset={{@changeset}}
          @validationField="address.city"
          class="input_block col-span-4"
          data-test-input="city"
        />
        <InputsValidation
          @label="Code Postal"
          @changeset={{@changeset}}
          @validationField="address.zip"
          class="input_block col-span-4"
          data-test-input="zip"
        />
        <InputsValidation
          @label="Pays"
          @changeset={{@changeset}}
          @validationField="address.country"
          class="input_block col-span-4"
          data-test-input="country"
        />
      </fieldset>
      {{#if this.guestsNumber}}
        <fieldset class="grid grid-cols-12 gap-x-10 gap-y-8">
          <h3 class="text-2xl font-semibold mt-8 col-span-12">Voyageurs</h3>
          {{#each this.guests as |guest index|}}
            <h4 class="font-semibold text-sm -mb-3 col-span-12">Voyageur {{this.inc index}}</h4>
            <InputsValidation
              @label="Nom"
              @changeset={{@changeset}}
              @validationField={{concat "guests." index ".lastName"}}
              class="input_block col-span-6"
              data-test-input={{concat "guests." index ".lastName"}}
            />
            <InputsValidation
              @label="Prénom"
              @changeset={{@changeset}}
              @validationField={{concat "guests." index ".firstName"}}
              class="input_block col-span-6"
              data-test-input={{concat "guests." index ".firstName"}}
            />
            <div class="col-span-4"></div>
          {{/each}}
        </fieldset>
      {{/if}}
      <button
        type="submit"
        class="mt-8 px-3 py-1 bg-primary text-white font-thin flex items-center space-x-4 rounded group ml-auto"
      >
        <span>Confirmer la réservation</span>
        <img
          loading="lazy"
          src="/assets/icons/arrow-right.svg"
          class="h-6 duration-200 group-hover:-translate-x-1"
        />
      </button>
    </YupForm>
  </template>
}

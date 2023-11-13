import Component from '@glimmer/component';
import { service } from '@ember/service';

import Header from 'ember-boilerplate/components/header';
// @ts-expect-error no types
import FlashMessage from 'ember-cli-flash/components/flash-message';
// @ts-expect-error no types
import HeadLayout from 'ember-cli-head/components/head-layout';
import RouteTemplate from 'ember-route-template';

import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

class ApplicationRouteComponent extends Component {
  @service declare flashMessages: FlashMessageService;

  <template>
    <HeadLayout />
    <div class="fixed z-10 top-4 right-4">
      {{#each this.flashMessages.arrangedQueue as |flash|}}
        <FlashMessage @flash={{flash}} />
      {{/each}}
    </div>
    <div class="flex flex-col max-w-7xl mx-auto w-full px-8 xl:px-0">
      <Header />
      {{outlet}}
    </div>
  </template>
}

export default RouteTemplate(ApplicationRouteComponent);

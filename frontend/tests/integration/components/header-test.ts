import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';

module('Integration | Component | header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Header />`);

    assert.dom().hasText('Accueil');
  });
});

import { LinkTo } from '@ember/routing';

<template>
  <header class="flex py-12 justify-start space-x-16 items-center">
    <img
      loading="lazy"
      src="/assets/images/logo_tripnb.png"
      class="aspect-[3.74] object-contain object-center w-[303px] overflow-hidden"
    />
    <nav>
      <ul class="flex space-x-8">
        <li>
          <LinkTo @route="application" class="menu-item text-primary font-medium text-xl">
            Accueil
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="booking" class="menu-item text-primary font-medium text-xl">
            Ma réservation
          </LinkTo>
        </li>
      </ul>
    </nav>
  </header>
</template>

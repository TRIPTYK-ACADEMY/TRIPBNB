export default <template>
  <div
    class="rounded bg-white flex w-full flex-col items-stretch mt-32 mx-auto pl-5 pr-5 pt-8 pb-11 max-md:mt-10 max-md:pl-5"
  >
    <div class="flex items-stretch justify-between gap-5">
      <div class="flex grow basis-[0%] flex-col items-stretch">
        <div class="text-slate-700 text-xs whitespace-nowrap">
          Arrivée
        </div>
        <div
          class="rounded shadow-sm bg-white flex justify-between gap-5 mt-1.5 pl-2 pr-2.5 py-3.5"
        >
          <div class="text-slate-700 text-xs mt-1">17/07/24</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/02ab60d9-4da9-45a7-a969-2be7a37fe5d4?"
            class="aspect-square object-contain object-center w-[13px] stroke-[1px] stroke-slate-700 overflow-hidden self-stretch shrink-0 max-w-full"
          />
        </div>
      </div>
      <div class="flex grow basis-[0%] flex-col items-stretch">
        <div class="text-slate-700 text-xs whitespace-nowrap">Départ</div>
        <div
          class="rounded shadow-sm bg-white flex justify-between gap-5 pl-2.5 pr-2.5 py-3.5"
        >
          <div class="text-slate-700 text-xs mt-1">19/07/24</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/502515e7-0eb5-47dc-8210-fd68618f8e61?"
            class="aspect-square object-contain object-center w-[13px] stroke-[1px] stroke-slate-700 overflow-hidden self-stretch shrink-0 max-w-full"
          />
        </div>
      </div>
    </div>
    <div class="text-slate-700 text-xs whitespace-nowrap mt-5">
      Voyageurs
    </div>
    <div
      class="rounded shadow-sm bg-white flex justify-between gap-5 px-3 py-4"
    >
      <div class="text-slate-700 text-xs">4 Voyageurs</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fe1340c-f600-4557-be27-ebd84e016845?"
        class="aspect-[1.13] object-contain object-center w-[9px] fill-zinc-600 overflow-hidden shrink-0 max-w-full"
      />
    </div>
    <div class="flex justify-between gap-5 mt-7">
      <div class="flex grow basis-[0%] flex-col items-stretch mt-1.5">
        <div
          class="text-orange-400 text-xl font-semibold whitespace-nowrap"
        >
          822€ par nuit
        </div>
        <div class="text-black text-base whitespace-nowrap mt-8">
          822€ x 2 nuits
        </div>
      </div>
      <div
        class="self-stretch flex grow basis-[0%] flex-col items-stretch"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddc58dae-5efb-4c24-a911-9e7bf1727782?"
          class="aspect-[4.64] object-contain object-center w-[130px] overflow-hidden"
        />
        <div
          class="text-black text-base font-semibold whitespace-nowrap mt-7"
        >
          Total : 1644€
        </div>
      </div>
    </div>
  </div>
</template>

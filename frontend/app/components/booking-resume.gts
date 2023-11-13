export default <template>
          <div class="flex flex-col items-stretch mt-1 max-md:mt-9">
          <div class="text-slate-500 text-base font-medium whitespace-nowrap">
            Récapitulatif
          </div>
          <div
            class="rounded bg-white flex items-stretch justify-between gap-1.5 mt-2 pl-4 pr-1.5 pt-3 pb-8"
          >
            <div class="flex grow basis-[0%] flex-col items-stretch">
              <img
                loading="lazy"
                src="https://dummyimage.com/600x400/000/fff"
                class="aspect-[1.57] object-contain object-center w-[132px] overflow-hidden"
              />
              <div class="text-black text-lg font-medium tracking-normal mt-5">
                Détails du prix
              </div>
              <div class="text-black text-base tracking-normal mt-5">
                822€ x 2 nuits
              </div>
            </div>
            <div
              class="flex grow basis-[0%] flex-col items-stretch mt-4 self-start"
            >
              <div class="text-black text-sm leading-4 tracking-normal">
                Villa de luxe avec piscine privée et vue panoramique
              </div>
              <div
                class="text-black text-base font-semibold tracking-normal mr-3.5 mt-20 max-md:mr-2.5 max-md:mt-10"
              >
                Total : 1644€
              </div>
            </div>
          </div>
          <div
            class="text-slate-500 text-base font-medium whitespace-nowrap mt-8"
          >
            Fournisser une pièce en pièce jointe
          </div>
          <div
            class="rounded bg-white flex flex-col items-center mt-1 px-5 py-8"
          >
            <div
              class="border border-[color:var(--primary-highlight,#6550A1)] bg-white flex w-[272px] max-w-full flex-col items-stretch pl-9 pr-9 pt-9 pb-16 rounded-md border-dashed max-md:px-5"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/920dabb1-d822-4842-958c-5abf2c378ece?"
                class="aspect-[0.87] object-contain object-center w-[45px] stroke-[3px] stroke-zinc-600 overflow-hidden self-center max-w-full"
              />
              <div
                class="text-slate-500 text-center text-xs underline mt-14 max-md:mt-10"
              >
                <span class="text-zinc-600">
                  Glissez un fichier sur cette zone ou
                  <br />
                </span>
                <span class="text-slate-500">choisissez un fichier</span>
                <span class="text-zinc-600">à uploader</span>
              </div>
              <div
                class="text-zinc-600 text-center text-xs self-center whitespace-nowrap mt-7"
              >
                Maximum 50Mb
              </div>
            </div>
          </div>
          <div class="flex w-full items-stretch justify-between gap-5 mt-6">
            <div class="flex items-stretch justify-between gap-5">
              <img
                loading="lazy"
                src="https://dummyimage.com/600x400/000/fff"
                class="aspect-square object-contain object-center w-[52px] overflow-hidden shrink-0 max-w-full"
              />
              <div
                class="text-black text-base font-medium self-center whitespace-nowrap my-auto"
              >
                coin_from_carglass.png
              </div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/33a7189c-1f0d-4421-ab6c-e4ef1927e207?"
              class="aspect-[0.87] object-contain object-center w-[13px] stroke-[1px] stroke-black overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
        </div>
</template>

export default <template>
  <div
    class="flex w-[753px] max-w-full items-stretch justify-between gap-5 mt-16 max-md:flex-wrap max-md:mt-10"
  >
    <img
      loading="lazy"
      src="https://dummyimage.com/600x400/000/fff"
      class="aspect-[3.74] object-contain object-center w-[303px] overflow-hidden"
    />
    <div
      class="self-center flex grow basis-[0%] flex-col items-stretch my-auto"
    >
      <div class="flex items-stretch justify-between gap-5">
        <div class="text-slate-500 text-2xl font-semibold">Accueil</div>
        <div class="text-slate-500 text-2xl font-semibold whitespace-nowrap">
          Mes réservations
        </div>
      </div>
      <div
        class="bg-orange-400 flex w-24 shrink-0 h-[3px] flex-col mt-3 self-start"
      ></div>
    </div>
  </div>
</template>

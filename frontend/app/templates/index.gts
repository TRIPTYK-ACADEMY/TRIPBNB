import BookingSummary from "ember-boilerplate/components/booking-details";
import PropertyCard from "ember-boilerplate/components/property-card";
import SearchBar from "ember-boilerplate/components/search-bar";
import RouteTemplate from "ember-route-template";

export default RouteTemplate(
  <template>
      <div class="self-stretch mt-20 mb-16 max-md:max-w-full max-md:my-10">
        <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div
            class="flex flex-col items-stretch w-[63%] max-md:w-full max-md:ml-0"
          >
            <div
              class="items-stretch content-start flex-wrap flex grow flex-col max-md:max-w-full max-md:mt-10"
            >
              <SearchBar />
              <PropertyCard />
            </div>
          </div>
          <div
            class="flex flex-col items-stretch w-[37%] ml-5 max-md:w-full max-md:ml-0"
          >
            <BookingSummary />
          </div>
        </div>
      </div>
  </template>
);



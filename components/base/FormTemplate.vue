<template>
  <BaseForm
    title="Cadastro de Empresas"
  >
    <div class="md:col-span-5">
      <label for="full_name">Full Name</label>
      <input
        id="full_name"
        type="text"
        name="full_name"
        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        value=""
      >
    </div>

    <div class="md:col-span-5">
      <label for="email">Email Address</label>
      <input
        id="email"
        type="text"
        name="email"
        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        value=""
        placeholder="email@domain.com"
      >
    </div>

    <div class="md:col-span-3">
      <label for="address">Address / Street</label>
      <input
        id="address"
        type="text"
        name="address"
        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        value=""
        placeholder=""
      >
    </div>

    <div class="md:col-span-2">
      <label for="city">City</label>
      <input
        id="city"
        type="text"
        name="city"
        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        value=""
        placeholder=""
      >
    </div>

    <div class="md:col-span-2">
      <label for="country">Country / region</label>
      <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
        <input
          id="country"
          name="country"
          placeholder="Country"
          class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
          value=""
        >
        <button
          tabindex="-1"
          class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
        >
          <svg
            class="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
            />
          </svg>
        </button>
        <button
          tabindex="-1"
          for="show_more"
          class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
        >
          <svg
            class="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><polyline points="18 15 12 9 6 15" /></svg>
        </button>
      </div>
    </div>

    <div class="md:col-span-2">
      <label for="state">State / province</label>
      <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
        <input
          id="state"
          name="state"
          placeholder="State"
          class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
          value=""
        >
        <button
          tabindex="-1"
          class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
        >
          <svg
            class="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
            />
          </svg>
        </button>
        <button
          tabindex="-1"
          for="show_more"
          class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
        >
          <svg
            class="w-4 h-4 mx-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><polyline points="18 15 12 9 6 15" /></svg>
        </button>
      </div>
    </div>

    <div class="md:col-span-1">
      <label for="zipcode">Zipcode</label>
      <input
        id="zipcode"
        type="text"
        name="zipcode"
        class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        placeholder=""
        value=""
      >
    </div>

    <div class="md:col-span-5">
      <div class="inline-flex items-center">
        <input
          id="billing_same"
          type="checkbox"
          name="billing_same"
          class="form-checkbox"
        >
        <label
          for="billing_same"
          class="ml-2"
        >My billing address is different than above.</label>
      </div>
    </div>

    <div class="md:col-span-2">
      <label for="soda">How many soda pops?</label>
      <div class="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
        <button
          tabindex="-1"
          for="show_more"
          class="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mx-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <input
          id="soda"
          name="soda"
          placeholder="0"
          class="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
          value="0"
        >
        <button
          tabindex="-1"
          for="show_more"
          class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mx-2 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="md:col-span-5 text-right">
      <div class="inline-flex items-end">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>

    <!-- <a
          href="https://www.buymeacoffee.com/dgauderman"
          target="_blank"
          class="md:absolute bottom-0 right-0 p-4 float-right"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          >
        </a> -->
  </BaseForm>
</template>

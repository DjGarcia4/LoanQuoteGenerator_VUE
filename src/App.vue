<script setup>
import Header from "./components/Header.vue";
import { ref, computed, watch } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { totalPay } from "./helpers";

const $toast = useToast({
  position: "top",
});
const cant = ref(10000);
const months = ref(6);
const total = ref(0);

const min = 2000;
const max = 20000;
const step = 100;

const formatMoney = (cant) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(cant);
};

watch([cant, months], () => {
  total.value = totalPay(cant.value, months.value);
});

const monthlyPayment = computed(() => {
  return total.value / months.value;
});

const handleDecrement = () => {
  if (cant.value <= min) {
    $toast.error("Invalid amount");
    return;
  }
  cant.value -= step;
};
const handleIncrement = () => {
  if (cant.value === max) {
    $toast.error("Invalid amount");
    return;
  }
  cant.value += step;
};
</script>

<template>
  <div class="h-screen grid place-items-center">
    <div class="bg-white p-10 rounded-md shadow-lg">
      <Header />
      <div class="grid grid-cols-10 gap-4 my-3">
        <button class="col-span-1" @click="handleDecrement">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-emerald-600 transition-colors hover:text-red-500 hover:animate-pulse"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="col-span-8">
          <input
            type="range"
            class="w-full accent-emerald-500 hover:accent-emerald-600 border-none"
            :min="min"
            :max="max"
            :step="step"
            v-model.number="cant"
          />
        </div>

        <button class="col-span-1" @click="handleIncrement">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-emerald-600 transition-colors hover:text-green-500 hover:animate-pulse"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p class="text-center text-emerald-600 font-bold text-3xl">
        {{ formatMoney(cant) }}
      </p>
      <div class="my-5">
        <h2
          class="text-2xl md:text-4xl font-extrabold text-gray-500 text-center"
        >
          Choose a <span class="text-emerald-600">repayment</span> term
        </h2>
        <select
          class="w-full bg-white border border-gray-400 rounded-md my-2 text-center text-gray-500 md:text-2xl h-7 md:h-10"
          :value="months"
          v-model.number="months"
        >
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
          <option value="24">24 Months</option>
        </select>
      </div>
      <div
        v-if="total > 0"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :variants="{ custom: { scale: 2 } }"
        :hovered="{ scale: 1.2 }"
        :delay="200"
        class="text-center bg-gray-50 rounded-md p-5 shadow"
      >
        <h2
          class="text-2xl md:text-3xl font-extrabold text-gray-500 text-center"
        >
          Payment Summary:
        </h2>
        <p class="text-xl md:text-2xl font-extrabold text-gray-400 text-center">
          Months: <span class="font-meium text-emerald-500">{{ months }}</span>
        </p>
        <p class="text-xl md:text-2xl font-extrabold text-gray-400 text-center">
          Total to Pay:
          <span class="font-meium text-emerald-500">{{
            formatMoney(total)
          }}</span>
        </p>
        <p class="text-xl md:text-2xl font-extrabold text-gray-400 text-center">
          Monthly:
          <span class="font-meium text-emerald-500">{{
            formatMoney(monthlyPayment)
          }}</span>
        </p>
      </div>
      <p
        v-else
        class="text-xl md:text-3xl font-extrabold text-gray-400 text-center"
      >
        Add an amount and a repayment term
      </p>
    </div>
  </div>
</template>

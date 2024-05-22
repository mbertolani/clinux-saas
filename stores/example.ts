import { defineStore } from 'pinia'

// const useBaseStore = () => {
//   const name = ref<string>('');
//   const age = ref<number>(1);
//   const ageString = computed(() => `${name.value} is aged ${age.value}`);

//   function doubleAge() {
//     age.value *= 2;
//   }

//   return { name, age, ageString, doubleAge };
// };

// export const usePersonStore = defineStore('person-store', () => {
//   const base = useBaseStore();
//   function tripleAge() {
//     base.age.value *= 3;
//   }
//   return { ...base, tripleAge };
// });

// export const useOtherStore = defineStore('other-store', () => {
//   function sayHello() {
//     console.log('Hello');
//   }
//   return {
//     ...useBaseStore(),
//     sayHello,
//   };
// });

export const useMyExampleStore = defineStore('my-example-store', () => {
  return {}
})

<template>
  <main class="flex items-center justify-center w-full min-h-screen px-4">
    <div class="flex flex-col w-full max-w-2xl ">
      <h1 class="mb-8 text-6xl text-center sm:text-7xl font-imperial">Caesar cipher</h1>
      <div class="flex w-full p-4 mx-auto bg-white border border-black rounded-lg">
        <form @submit.prevent="encrypt" class="flex w-full gap-5 sm:gap-8">
          <div class="flex flex-col flex-1">
            <p class="mb-4 text-xs text-gray-500">
              <span class="block font-semibold">Alphabet: </span>
              a, ą, b, c, ć, d, e, ę, f, g, h, i, j, k, l, ł, m, n, ń, o, ó, p, q, r, s, ś, t, u, v, w, x, y,
              z, ź, ż (35 chars)
            </p>
            <BaseTextarea v-model="vText" :id="1" class="mb-8">Text to encrypt or decrypt</BaseTextarea>
            <BaseTextarea v-model="vResult" :id="2" readonly>result</BaseTextarea>
          </div>
          <div class="flex flex-col justify-between gap-4">
            <div class="flex flex-col gap-4">
              <BaseButton @btn-click="encrypt" type="submit">encrypt</BaseButton>
              <BaseButton @btn-click="decrypt">decrypt</BaseButton>
            </div>
            <BaseSelect v-model="vKey" :id="1" :options="keyOptions">Key</BaseSelect>
          </div>
        </form>
      </div>
      <span class="mt-2 text-xs text-center text-gray-500">
        <a href="https://woytek-portfolio.pl" class="hover:underline hover:text-[#D8B4FE]" target="_blank">Wojciech
          Skirło</a> &copy 2022
      </span>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "./components/BaseButton.vue";
import BaseTextarea from "./components/BaseTextarea.vue";
import BaseSelect from "./components/BaseSelect.vue"

const vText = ref("");
const vResult = ref("");

type TypeCiper = 'encrypt' | 'decrypt';

const vKey: any = ref(null);
const keyOptions = [
  {
    id: 1,
    value: 1,
    name: "1"
  },
  {
    id: 2,
    value: 2,
    name: "2"
  },
  {
    id: 3,
    value: 3,
    name: "3"
  },
  {
    id: 4,
    value: 4,
    name: "4"
  },
  {
    id: 5,
    value: 5,
    name: "5"
  },
  {
    id: 6,
    value: 6,
    name: "6"
  },
  {
    id: 7,
    value: 7,
    name: "7"
  },
  {
    id: 8,
    value: 8,
    name: "8"
  },
  {
    id: 9,
    value: 9,
    name: "9"
  },
  {
    id: 10,
    value: 10,
    name: "10"
  },
  {
    id: 11,
    value: 11,
    name: "11"
  },
  {
    id: 12,
    value: 12,
    name: "12"
  },
  {
    id: 13,
    value: 13,
    name: "13"
  },
  {
    id: 14,
    value: 14,
    name: "14"
  },
  {
    id: 15,
    value: 15,
    name: "15"
  },
  {
    id: 16,
    value: 16,
    name: "16"
  },
  {
    id: 17,
    value: 17,
    name: "17"
  },
  {
    id: 18,
    value: 18,
    name: "18"
  },
  {
    id: 19,
    value: 19,
    name: "19"
  },
  {
    id: 20,
    value: 20,
    name: "20"
  },
  {
    id: 21,
    value: 21,
    name: "21"
  },
  {
    id: 22,
    value: 22,
    name: "22"
  },
  {
    id: 23,
    value: 23,
    name: "23"
  },
  {
    id: 24,
    value: 24,
    name: "24"
  },
  {
    id: 25,
    value: 25,
    name: "25"
  },
  {
    id: 26,
    value: 26,
    name: "26"
  },
  {
    id: 27,
    value: 27,
    name: "27"
  },
  {
    id: 28,
    value: 28,
    name: "28"
  },
  {
    id: 29,
    value: 29,
    name: "29"
  },
  {
    id: 30,
    value: 30,
    name: "30"
  },
  {
    id: 31,
    value: 31,
    name: "31"
  },
  {
    id: 32,
    value: 32,
    name: "32"
  },
  {
    id: 33,
    value: 33,
    name: "33"
  },
  {
    id: 34,
    value: 34,
    name: "34"
  },
]

vKey.value = { ...keyOptions[2] }

const encrypt = () => {
  vResult.value = vText.value.toLowerCase();
  vResult.value = deleteWhitespaces(vResult.value);
  vResult.value = deleteCharsOutsideOfAlphabet(vResult.value);
  vResult.value = caesarCiper(vResult.value, vKey.value.value, 'encrypt');
  vResult.value = vResult.value.toUpperCase();
}

const decrypt = () => {
  vResult.value = vText.value.toLowerCase();
  vResult.value = deleteWhitespaces(vResult.value);
  vResult.value = deleteCharsOutsideOfAlphabet(vResult.value);
  vResult.value = caesarCiper(vResult.value, vKey.value.value, 'decrypt');
  vResult.value = vResult.value.toUpperCase();
}

// 35 chars
const alphabet = [
  "a",
  "ą",
  "b",
  "c",
  "ć",
  "d",
  "e",
  "ę",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "ł",
  "m",
  "n",
  "ń",
  "o",
  "ó",
  "p",
  "q",
  "r",
  "s",
  "ś",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "ź",
  "ż"
]

const deleteWhitespaces = (string: string) => {
  return string.replaceAll(/\s/g, '');
}

const deleteCharsOutsideOfAlphabet = (string: string) => {
  return string.split("").filter((letter) => alphabet.includes(letter)).join("");
}

const caesarCiper = (string: string, key: number, type: TypeCiper) => {
  const alphabetLength: number = alphabet.length;
  return string.split("").map((letter) => {
    let index: number = (alphabet.indexOf(letter) + (type === 'encrypt' ? +key : -key));
    (index < 0) ? index += alphabetLength : (index > alphabetLength - 1) ? index -= alphabetLength : index;
    return alphabet[index];
  }).join("");
}
</script>
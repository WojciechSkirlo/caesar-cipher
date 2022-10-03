<template>
  <main class="flex items-center justify-center w-full min-h-screen px-4">
    <div class="flex w-full max-w-2xl p-4 mx-auto bg-white border border-black rounded-lg">
      <form @submit.prevent="encrypt" class="flex w-full gap-8">
        <div class="flex flex-col flex-1 gap-6">
          <BaseTextarea v-model="vText" :id="1">Text to encrypt or decrypt</BaseTextarea>
          <BaseTextarea v-model="vResult" :id="2">result</BaseTextarea>
        </div>
        <div class="flex flex-col gap-4">
          <BaseButton @btn-click="encrypt" type="submit">encrypt</BaseButton>
          <BaseButton @btn-click="decrypt">decrypt</BaseButton>
        </div>
      </form>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "./components/BaseButton.vue";
import BaseTextarea from "./components/BaseTextarea.vue";

const vText = ref("");
const vResult = ref("");

type TypeCiper = 'encrypt' | 'decrypt';

const key = ref(3);

const encrypt = () => {
  vResult.value = vText.value.toLowerCase();
  vResult.value = deleteWhitespaces(vResult.value);
  vResult.value = deleteCharsOutsideOfAlphabet(vResult.value);
  vResult.value = caesarCiper(vResult.value, key.value, 'encrypt');
  vResult.value = vResult.value.toUpperCase();
}

const decrypt = () => {
  vResult.value = vText.value.toLowerCase();
  vResult.value = deleteWhitespaces(vResult.value);
  vResult.value = deleteCharsOutsideOfAlphabet(vResult.value);
  vResult.value = caesarCiper(vResult.value, key.value, 'decrypt');
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
  // "q",
  "r",
  "s",
  "ś",
  "t",
  "u",
  // "v",
  "w",
  // "x",
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


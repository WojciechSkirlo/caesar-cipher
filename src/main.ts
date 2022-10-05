import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";

const clickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.clickOutsideEvent = (event: any) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },

  unmounted: (el: any) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const app = createApp(App);
app.directive("click-outside", clickOutside)
app.mount("#app");


import Vue from "vue";

import App from "./app.vue";
import Button from "./components/button/button.vue";

Vue.component("app-button", Button);

window.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        render(createElement) {
            return createElement(App);
        }
    });
});

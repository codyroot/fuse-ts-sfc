export default {
    methods: {
        clickMe() {
            (this as any).$emit("clicked", (this as any).$el.textContent);
        }
    }
}

export default {
    methods: {
        clickMe() {
            this.$emit("clicked", this.$el.textContent);
            this.$emit("clicked", this.$el.textContent);
            this.$emit("clicked", this.$el.textContent);
        }
    }
}

<template>
    <div>
        <section>
            <app-button @clicked="method">blubb</app-button>
        </section>
    </div>
</template>

<style src="./app.css"></style>

<script lang="ts">

export default {
    methods: {
        method(d: string) {
            console.log(d);
        }
    }
}
</script>
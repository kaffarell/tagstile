
<page>
  <actionBar title="New Label" />
  <stackLayout height="100%">
    <label text="Owner:" />
    <textField bind:text="{ownerInput}" />

    <label text="Location:" />
    <textField bind:text="{locationInput}" />

    <label text="Main color:" />
    <textField bind:text="{mainColorInput}" />

    <label text="Secondary color:" />
    <textField bind:text="{secondaryColorInput}" />

    <label text="Pattern:" />
    <textField bind:text="{patternInput}" />

    <label text="Material:" />
    <textField bind:text="{materialInput}" />

    <label text="Washing info (example: temperature=98):" />
    <textField class="bigInput" bind:text="{materialInput}" />

    <label text="Washable:" />
    <switch bind:checked="{washableInput}" />

    <button on:tap={createLabel}>Create Label</button>

  </stackLayout>
</page>

<script lang="ts">
    import { goBack } from 'svelte-native';




    let ownerInput: string;
    let locationInput: string;
    let mainColorInput: string;
    let secondaryColorInput: string;
    let patternInput: string;
    let materialInput: string;
    let washableInput: boolean;

    function createLabel() {
        // make rest cal with all the variables

        // then go back
        goBack()
    }
</script>

<style>
    .bigInput {
        height: 17%;
    }
    label {
        font-size: 14;
        margin-left: 10%;
    }
    button {
        background-color: #54CFBB;
        border-radius: 10vw;
    }
</style>
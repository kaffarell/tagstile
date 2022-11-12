<script lang="ts">
  import { Http, HttpResponse } from "@nativescript/core";
  import { goBack } from "svelte-native";
  import { Toasty } from "nativescript-toasty";
  import { getUUID } from "@owen-it/nativescript-uuid";

  let ownerInput: string;
  let locationInput: string;
  let mainColorInput: string;
  let secondaryColorInput: string;
  let patternInput: string;
  let materialInput: string;
  let washingInfoInput: string;
  let washableInput: boolean;

  function createLabel() {
    // make rest cal with all the variables
    let id: string = getUUID();
    Http.request({
      url: "https://tagstile-app.herokuapp.com/api/v1/label/" + id,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        owner: ownerInput,
        location: locationInput,
        mainColor: mainColorInput,
        secondaryColor: secondaryColorInput,
        pattern: patternInput,
        material: materialInput,
        washInfo: washingInfoInput,
        washable: washableInput,
      }),
    }).then(
      (response: HttpResponse) => {
        const result = response.content?.toJSON();
        console.log(`Http POST Result: ${result}`);
        if (response.statusCode === 201) {
          const toast = new Toasty({ text: "Success!" });
          toast.show();
        } else {
          const toast = new Toasty({ text: "Failed!" });
          toast.show();
        }
      },
      (e) => {}
    );

    // then go back
    goBack();
  }
</script>

<page>
  <actionBar title="New Label" />
  <stackLayout height="100%">
    <label text="Owner:" />
    <textField bind:text={ownerInput} />

    <label text="Location:" />
    <textField bind:text={locationInput} />

    <label text="Main color:" />
    <textField bind:text={mainColorInput} />

    <label text="Secondary color:" />
    <textField bind:text={secondaryColorInput} />

    <label text="Pattern:" />
    <textField bind:text={patternInput} />

    <label text="Material:" />
    <textField bind:text={materialInput} />

    <label text="Washing info (example: temperature=98):" />
    <textField class="bigInput" bind:text={washingInfoInput} />

    <label text="Washable:" />
    <switch bind:checked={washableInput} />

    <button on:tap={createLabel}>Create Label</button>
  </stackLayout>
</page>

<style>
  .bigInput {
    height: 17%;
  }
  label {
    font-size: 14;
    margin-left: 10%;
  }
  button {
    background-color: #54cfbb;
    border-radius: 10vw;
  }
</style>

<script lang="ts">
  import { Http, HttpResponse } from "@nativescript/core";
  import { navigate } from "svelte-native";
  import { Toasty } from "nativescript-toasty";
  import { writeNfcTag } from "~/managers/nfcManager";
  import Home from "./Home.svelte";


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
    let id: string = Date.now().toString();
    console.log(id);

    writeNfcTag(id).then(() => {
        console.log('Successfully written');
        console.log('sending stuff')
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
                washable: washableInput == true ? true : false,
            }),
        }).then(
            (response: HttpResponse) => {
                console.log('got request');
                console.log(response.statusCode);
                if (response.statusCode === 201) {
                    // then go back
                    navigate({
                        page: Home
                    });
                } else {
                    console.log('failed');
                }
            },
            (e) => {
                console.log(e);
                const toast = new Toasty({ text: "Failed!" });
                toast.show();
                console.log('failed');
            }
        );
        console.log('after then');
    });
  }
</script>

<page actionBarHidden="{true}">
  <stackLayout height="100%">
    <scrollView orientation="vertical">
        <stackLayout>        
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
        </stackLayout>

    </scrollView>

    <button on:tap={createLabel}>Create Label</button>
  </stackLayout>
</page>

<style>
    .bigInput {
        height: 15%;
    }
    scrollView {
        height: 85%
    }
    label {
        font-size: 17;
        margin-left: 10%;
        color: black;
    }
    button {
        background-color: white;
        border-radius: 10vw;
        color: black;
    }
    textField {
        color: black;
        font-size: 18;
        margin-left: 5%;
    }
    page {
        background: linear-gradient(white, #b9bbbb);
        color: black;
    }
</style>

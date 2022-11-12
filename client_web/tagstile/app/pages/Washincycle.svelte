<script lang="ts">
    import { Http, HttpResponse } from "@nativescript/core";
    import { navigate } from "svelte-native";
    import { readNfcTag } from "~/managers/nfcManager";
    import Home from "./Home.svelte";
    import { prompt } from '@nativescript/core/ui/dialogs'


    let array: any[] = [];

    let uniqueId: string;
    let owner: string;
    let washable: string;
    let washInfo: string;
    let material: string;
    let mainColor: string;
    let secondaryColor: string;
    let pattern: string;
    let compatibilityMessage = 'Compare more than two tags...';
    let selectedWashingMachine: number;

    prompt('Enter washingmachine number/id: ').then((res) => {
        selectedWashingMachine = parseInt(res.text);
    });

    readNfcTag((content) => {
        // first check if new 
        console.log('scanned: ' + content);
        console.log(array);

        // store in array storage

        Http.request({
            url: "https://tagstile-app.herokuapp.com/api/v1/label/id/" + content[0],
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(
            (response: HttpResponse) => {
                if (response.statusCode === 200) {
                    uniqueId = response.content?.toJSON()["_id"];
                    washable = response.content?.toJSON().washable ?? "";
                    owner = response.content?.toJSON().owner ?? "";
                    washInfo = response.content?.toJSON().washInfo ?? "";
                    material = response.content?.toJSON().material ?? "";
                    mainColor = response.content?.toJSON().mainColor ?? "";
                    secondaryColor = response.content?.toJSON().secondaryColor ?? "";
                    pattern = response.content?.toJSON().pattern ?? "";
                    let currentObject = {
                        uniqueId: uniqueId,
                        owner: owner,
                        fabric: material,
                        temperature: washInfo,
                        color: mainColor,
                    }
                    let isWashable = true;
                    for(let i = 0; i < array.length; i++) {
                        if(!washableTogether(array[i], currentObject)) {
                            isWashable = false;
                        } 
                    }
                    if(isWashable === true ) {
                        if(!array.some((e) => e.uniqueId === currentObject.uniqueId)) {
                            console.log('washable with previous textile');
                            // add to storage
                            array.push({
                                uniqueId: uniqueId,
                                owner: owner,
                                temperature: washInfo,
                                fabric: material,
                                color: mainColor
                            });
                            // Hack to trigger svelte rerender
                            array = array;
                            compatibilityMessage = 'Washable with previous textiles';
                        }else{
                            compatibilityMessage = 'Textile already scanned';
                        }
                    }else{
                        console.log('not washable with previouso textile');
                        compatibilityMessage = 'Current textile NOT washable with previous ones';
                    }
                } else {
                    console.log('failed');
                    resetInfos();
                }
            },
            (e) => {
                console.log(e);
                console.log('failed');
                resetInfos();
            }
        );
    });

    function returnToHome() {
        navigate({
            page: Home
        });
    }

    function startWash() {
        console.log('cool');
        console.log(array);
        for(let i = 0; i < array.length; i++) {
            Http.request({
                url: "https://tagstile-app.herokuapp.com/api/v1/wash/",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    labelId: array[i].uniqueId,
                    location: "WeWashEverything Inc.",
                    washingMachine: selectedWashingMachine
                }),
            }).then(
                (response: HttpResponse) => {
                    if (response.statusCode === 201) {
                        console.log('OK');
                    }
                },
                (e) => {
                    console.log(e);
                    console.log('failed');
                }
        )};

        resetInfos();
        reset();
    }

    function reset() {
        resetInfos();
        array = [];
    }

    function resetInfos() {
        // clear ui
        uniqueId = "";
        washable = "";
        owner = "";
        washInfo = "";
        material = "";
        mainColor = "";
        secondaryColor = "";
        pattern = "";
    }

    // check if we can add to storage
    function washableTogether(objA: any, objB: any) {
        if(objA.fabric !== "" && objB.fabric !== "")
            if(objA.fabric !== objB.fabric)
                return false;

        if(objA.temperature !== "" && objB.temperature !== "")
            if(objA.temperature !== objB.temperature)
                return false;

        if(objA.color !== "" && objB.color !== "")
            if(!colorMatches(objA.color, objB.color))
                return false;

        return true;
    }

    function colorMatches(colorA: string, colorB: string) {
        if(colorA === colorB)
            return true;

        if((colorA !== 'white' && colorB !== 'white') || (colorA === 'white' && colorB === 'white'))
            return true;

        return false;
    }
</script>

<page actionBarHidden="{true}">
  <stackLayout>
    <stackLayout class="infoGroup">
      <label textWrap={true}>
        <formattedString>
          <span text="UniqueId:" />
          <span text="{uniqueId}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      {#if owner != ""}
      <label textWrap={true}>
        <formattedString>
          <span text="Owner: " />
          <span text="{owner}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      {/if}
      <label textWrap={true}>
        <formattedString>
          <span text="Washable: " />
          <span text="{washable}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      {#if washInfo != ""}
      <label textWrap={true}>
        <formattedString>
          <span text="Washing Info: " />
          <span text="{washInfo}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      {/if}
      {#if material != ""}
      <label textWrap={true}>
        <formattedString>
          <span text="Material: " />
          <span text="{material}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      {/if}
      {#if mainColor != ""}
      <label textWrap={true}>
        <formattedString>
          <span text="Main Color: " />
          <span text="{mainColor}" style="font-weight: bold" />
        </formattedString>
      </label>
      {/if}
      {#if secondaryColor != ""}
      <label textWrap={true}>
        <formattedString>
          <span text="Secondary Color: " />
          <span text="{secondaryColor}" style="font-weight: bold" />
        </formattedString>
      </label>
      {/if}
      {#if pattern != ""}
      <label textWrap={true}>
        <formattedString>
          <span text="Pattern: " />
          <span text="{pattern}" style="font-weight: bold" />
        </formattedString>
      </label>
      {/if}
    </stackLayout>

    <button class="fas" on:tap={startWash}>Start washing</button>
    <label class="compMessage">
        <formattedString>
            <span text="{compatibilityMessage + '\n'}" style="font-weight: bold; font-size: 22" />
        </formattedString>
    </label>
    <textView editable="false" class="mainMessage" text="{array.map(e => e.uniqueId + ', ' + e.owner).join('\n')}" style="font-weight: bold; font-size: 18; color: black;" />
    <flexBoxLayout>
        <button class="fas" on:tap={reset}>Reset</button>
        <button class="fas" on:tap={returnToHome}>Return</button>
    </flexBoxLayout>
  </stackLayout>
</page>

<style>
    button {
        background-color: white;
        color: black;
        border-radius: 9vw;
        margin-top: 2%;
        box-shadow:0 0 40px rgba(0,0,0,0.2);
        font-size: 18;
        width: 90%;
    }
    label {
        font-size: 20;
        margin-top: 1%;
        margin-left: 10%;
    }

    .mainMessage {
        height: 15%;
        text-align: center;
    }
    .compMessage {
        width: 100%;
        text-align: center;
    }

    flexBoxLayout {
        width: 100%;
        justify-content: center;
    }
    page {
        background: linear-gradient(white, #b9bbbb);
        color: black;
    }
    .infoGroup {
        background-color: white;
        color: black;
        width: 90%;
        box-shadow:0 0 40px rgba(0,0,0,0.2);
        padding: 5%;
        border-radius: 9vw;
        vertical-align: center;
        margin-top: 3%;
        margin-bottom: 3%;
    }
</style>

<script lang="ts">
  import { Http, HttpResponse } from "@nativescript/core";
  import { navigate } from "svelte-native";
  import { readNfcTag, writeNfcTag } from "../managers/nfcManager";
  import Newlabel from "./Newlabel.svelte";
  import Washincycle from "./Washincycle.svelte";

  let message: string[] = [];

  let uniqueId: string;
  let washable: string;
  let owner: string;
  let washInfo: string;
  let material: string;
  let mainColor: string;

  readNfcTag((content) => {
    message = content;
    uniqueId = "";
    washable = "";
    owner = "";
    washInfo = "";
    material = "";
    mainColor = "";
    Http.request({
        url: "https://tagstile-app.herokuapp.com/api/v1/label/id/" + content[0],
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then(
        (response: HttpResponse) => {
            if (response.statusCode === 200) {
                console.log('works');
                uniqueId = response.content?.toJSON()["_id"];
                washable = response.content?.toJSON().washable;
                owner = response.content?.toJSON().owner;
                washInfo = response.content?.toJSON().washInfo;
                material = response.content?.toJSON().material;
                mainColor = response.content?.toJSON().mainColor;
            } else {
                console.log('failed');
            }
        },
        (e) => {
            console.log(e);
            console.log('failed');
        }
    );
  });

  function openNewLabelPage() {
    navigate({
      page: Newlabel,
    });
  }
  function openWashingcyclePage() {
    navigate({
      page: Washincycle,
    });
  }
</script>

<page actionBarHidden="{true}">
  <stackLayout>
    <stackLayout class="infoGroup">
      <label textWrap={true}>
        <formattedString>
          <span text="UniqueId:  " />
          <span text="{uniqueId}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Washable:  " />
          <span text="{washable}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Owner:  " />
          <span text="{owner}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Temperature:  " />
          <span text="{washInfo}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Material:  " />
          <span text="{material}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Color:  " />
          <span text="{mainColor}" style="font-weight: bold; font-size: 22;" />
        </formattedString>
      </label>
    </stackLayout>

    <button class="fas" on:tap={openNewLabelPage}>Create new label</button>
    <button class="fas" on:tap={openWashingcyclePage}>Start washing cycle</button>
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

    .infoGroup {
        background-color: white;
        color: black;
        width: 90%;
        height: 30%;
        box-shadow:0 0 40px rgba(0,0,0,0.2);
        border-radius: 9vw;
        vertical-align: center;
        margin-top: 3%;
        margin-bottom: 3%;
    }
    page {
        background: linear-gradient(white, #b9bbbb);
    }
</style>

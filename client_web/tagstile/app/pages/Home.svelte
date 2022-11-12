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

<page>
  <actionBar title="Home" />
  <stackLayout>
    <stackLayout>
      <label textWrap={true}>
        <formattedString>
          <span text="UniqueId:" />
          <span text="{uniqueId}" style="font-weight: bold" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Washable: " />
          <span text="{washable}" style="font-weight: bold" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Owner: " />
          <span text="{owner}" style="font-weight: bold" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Washing Info: " />
          <span text="{washInfo}" style="font-weight: bold" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Material: " />
          <span text="{material}" style="font-weight: bold" />
        </formattedString>
      </label>
      <label textWrap={true}>
        <formattedString>
          <span text="Main Color: " />
          <span text="{mainColor}" style="font-weight: bold" />
        </formattedString>
      </label>
    </stackLayout>

    <button on:tap={openNewLabelPage}>Create new label</button>
    <button on:tap={openWashingcyclePage}>Start washing cycle</button>
  </stackLayout>
</page>

<style>
    button {
        background-color: #54CFBB;
        border-radius: 10vw;
        margin-top: 8%;
    }
    label {
        font-size: 20;
        margin-top: 1%;
        margin-left: 10%;
    }
</style>

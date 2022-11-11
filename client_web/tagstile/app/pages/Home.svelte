<script lang="ts">
  import { navigate } from "svelte-native";
  import { readNfcTag, writeNfcTag } from "../managers/nfcManager";
  import Newlabel from "./Newlabel.svelte";

  let message: string[] = [];
  readNfcTag((content) => {
    message = content;
  });

  function openNewLabelPage() {
    navigate({
      page: Newlabel,
    });
  }
</script>

<page>
  <actionBar title="Home" />
  <stackLayout>
    <stackLayout>
      <label textWrap={true}>
        <formattedString>
          <span text="This text has a " />
          <span text="red " style="color: red" />
          <span text="piece of text. " />
          <span text="Also, this bit is italic, " fontStyle="italic" />
          <span text="and this bit is bold." fontWeight="bold" />
        </formattedString>
      </label>
    </stackLayout>

    <button on:tap={openNewLabelPage}>Create new label</button>
  </stackLayout>
</page>

<style>
    button {
        background-color: #54CFBB;
        border-radius: 10vw;
    }
</style>

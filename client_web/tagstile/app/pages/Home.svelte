<script lang="ts">
  import { readNfcTag, writeNfcTag } from "../managers/nfcManager";

  let message: string[] = [];
  readNfcTag((content) => {
    message = content;
  });

  function writeTagToId() {
    writeNfcTag("iglabsnt");
  }
</script>

<page>
  <actionBar title="Home" />
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

    <button on:tap={writeTagToId}>Write random id</button>
  </stackLayout>
</page>

<style>
  .info .fas {
    color: #3a53ff;
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>

<page>
    <actionBar title="Home" />
    <gridLayout>
        <label class="info">
            <formattedString>
                <span class="fas" text="&#xf135;" />
                <span text=" {message}" />
            </formattedString>
        </label>
    </gridLayout>
</page>

<script lang="ts">
    import { Nfc } from "nativescript-nfc";

    let message: string = "Blank Svelte Native App"
    let nfc = new Nfc();
    
    nfc.available().then(avail => {
        console.log(avail ? "Yes" : "No");
    });
</script>

<style>
    .info .fas {
        color: #3A53FF;
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>

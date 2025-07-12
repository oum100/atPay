<template>
    <div class="d-flex justify-center mt-10"  >
        <v-sheet color="blue-lighten-2" width="200" height="260" 
            class="d-flex flex-column" 
            rounded="xl"
            border="md opacity-50"
            style="position: relative; z-index: 1;"
        >
            <!-- Title -->
            <div class="mx-auto">
                <h4 class="text-h4 font-kanit font-weight-bold">DM-001</h4>
            </div>

            <!-- Icon -->
            <div>
                <v-img src="/public/washer-icon.png" width="70" height="80"
                style="position: absolute; top:35%; left:25%; transform: translate(-50%, -50%);"
                ></v-img>
            </div>

            <!-- Order button -->

            <v-btn
                width="70"
                height="70"
                rounded="circle"
                stacked
                color="blue-darken-2"
                style="position: absolute; top:35%; left:75%;  z-index: 1; transform: translate(-50%, -50%); justify-content: center;"
            >
                <v-icon size="25">mdi-cart</v-icon>
                <span class="font-noto-sans">ORDER</span>
            </v-btn>
            <AssetProduct :asset="assetData" />
        </v-sheet>
    </div>
    <AssetView :asset="assetData"/>
</template>

<script setup lang="ts">
    import { AssetStatus, AssetProduct,AssetView } from '#components';
    import { assetData } from '@@/data/assetData'

    definePageMeta({
        auth:false,
        layout:'blank'
    })

    const toggle = ref(0)


</script>
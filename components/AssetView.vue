<template>
    <div class="d-flex justify-center"  >
        <v-sheet :color="assetColor" width="200" height="260" 
            class="d-flex flex-column" 
            rounded="xl"
            border="md opacity-50"
            style="position: relative; z-index: 1;"
        >
            <!-- Title -->
            <div class="mx-auto text-h4 font-kanit font-weight-bold" :style="{color: assetNameColor}">
                {{ props.asset.name }}
            </div>

            <!-- Machine Icon -->
            <div v-if="assetStatus !== 'BUSY'">
                <v-img v-if="props.asset.assetType.code.toUpperCase() == 'WASHER'"
                src="/public/washer-icon.png" width="70" height="80"
                style="position: absolute; top:45%; left:25%; transform: translate(-50%, -50%);"
                ></v-img>

                <v-img v-if="props.asset.assetType.code.toUpperCase() == 'DRYER'"
                src="/public/dryer-icon.png" width="70" height="80"
                style="position: absolute; top:45%; left:25%; transform: translate(-50%, -50%);"
                ></v-img>   
            </div>

            <AssetProduct :asset="props.asset" v-if="assetStatus !== 'BUSY'"/>
            <AssetBusy :asset="props.asset" v-else/>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
    import { AssetStatus, AssetProduct,AssetBusy } from '#components';
    import type { AssetData } from '~/data/assetData'

    const props = defineProps<{
        asset: AssetData
    }>()


    // console.log("testData",props.asset)

    const assetStatus = computed(() => props.asset.status.toUpperCase())
    const assetType = computed(() => props.asset.assetType.code.toUpperCase())

    //Set Asset Name Color
    const assetNameColor = computed(() => {
        return props.asset.status.toUpperCase() === 'OFFLINE' ? 'grey' : 'black'
    })

    

    //Set AssetColor
    const assetColor = computed(()=>{
        if(props.asset.status.toUpperCase() !== 'OFFLINE'){
            if(assetType.value === 'WASHER') return 'blue-lighten-2'
            if(assetType.value === 'DRYER') return 'red-lighten-4'
        }else{
            return 'grey-lighten-1'
        }

    })

    // const orderBtnColor = assetType === 'WASHER'?'blue-darken-3':'red-darken-3'

    const inCart = ref(false)   
    // const clickOrder = () => {
    //     inCart.value = !inCart.value
    // }

</script>
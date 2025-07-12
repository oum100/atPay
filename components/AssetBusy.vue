<template>
    <div v-if="assetStatus === 'BUSY'">
        <!-- Status Bar -->
        <AssetStatus :status="assetStatus" language="TH"  />

        <!-- Machine Icon -->
        <div>
            <v-img v-if="assetType == 'WASHER'"
            src="/public/washer-icon.png" width="70" height="80"
            style="position: absolute; top:45%; left:50%; transform: translate(-50%, -50%);"
            ></v-img>

            <v-img v-if="assetType == 'DRYER'"
            src="/public/dryer-icon.png" width="70" height="80"
            style="position: absolute; top:45%; left:50%; transform: translate(-50%, -50%);"
            ></v-img>   
        </div>

        <!-- Service Time -->
        <v-sheet
            v-if="false"
            class="d-flex align-center justify-start flex-column"
            rounded="lg"
            color="grey-lighten-1"
            style="position: absolute; top:45%; left:73%; width:80px; height: 80px; z-index: 1; transform: translate(-50%, -50%); justify-content: center;"
        >
            <!-- <v-icon size="25" class="text-white">mdi-clock-outline</v-icon> -->
            <span class="text-subtitle-1 font-weight-bold">Service</span>
            <span class="text-subtitle-1 font-weight-medium">{{ timeRemain }}</span>
            <span class="text-subtitle-1 font-weight-medium">Minutes</span>
        </v-sheet>

        <!-- Bottom Sheet -->
        <v-sheet 
            width="196" height="140" 
            rounded="xl" 
            color="grey-lighten-4"
            style="position: absolute; top:72.5%; left:50%; z-index: -1; transform: translate(-50%, -50%);"
        >
            <!-- Time Remain -->
            <v-chip
                density="compact"
                style="position: absolute; top:40%; left:50%; width:180px; z-index: -1; transform: translate(-50%, -50%); justify-content: center;"    
            > 
                <span class="text-subtitle-1 font-weight-bold">Service Time</span>
            </v-chip>      
            <v-chip
                style="position: absolute; top:73%; left:50%; width:180px; height: 60px; z-index: -1; transform: translate(-50%, -50%); justify-content: center;"    
            > 
                <v-icon size="40">mdi-timer-sand</v-icon>
                <span class="text-h2 font-weight-bold">{{ timeRemain }}</span>
                <span class="text-h6 font-weight-bold">&nbsp;Mins</span>
            </v-chip>

        </v-sheet>    
    </div>

</template>

<script setup lang="ts">
    import type { AssetData } from '~/data/assetData'
    import { useCartStore } from '#imports';

    const props = defineProps<{
        asset: AssetData
    }>()

    const cart = useCartStore()

    const assetStatus = props.asset.status
    const assetType = props.asset.assetType.code

    
    const timeRemain = ref<number>(props.asset.timeRemain ?? props.asset.serviceTime ?? 0)



    watch(timeRemain, (newPrice) => {
        if (typeof newPrice === 'number') {
            props.asset.timeRemain = newPrice
        }
    })

    cart.removeItem(props.asset.assetId)
    
</script>
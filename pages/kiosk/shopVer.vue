<template>
    <div class=" d-flex flex-row flex-wrap justify-center mt-4">
        <div class="ma-1">
            <!-- Column 1 -->        
            <v-sheet
                class="d-flex justify-center flex-wrap bg-blue-lighten-3 flex-row"
                min-height="300"
                width="450"
                rounded = "xl"
            >
                <div class="d-flex flex-column align-center">
                    <!-- Banner -->
                    <v-sheet
                        class="text-h4 font-noto-sans font-weight-bold d-flex justify-center align-center mt-4"
                        height="50"
                        width="400"
                        color="blue-lighten-1"
                        rounded="xl"
                    >WASHER
                    </v-sheet>

                    <!-- Machine  -->
                    <div class="my-2 d-flex flex-row flex-wrap justify-center">
                        <v-sheet
                        v-for="machine,inx in washerMachone"
                        :key="inx"
                        class="ma-2 d-flex align-center justify-center"
                        width="200"
                        height="260"
                        rounded="xl"
                        color="blue-lighten-3"
                        >
                            <!-- WASHER {{ inx }} -->
                            <AssetView  :asset="machine"/>
                        </v-sheet>
                    </div>
                </div>
            </v-sheet>
        </div>

        
        <div class="ma-1">
            <!-- Column 2 -->
            <v-sheet
                class="d-flex justify-center flex-wrap bg-red-lighten-3 flex-row"
                min-height="800"
                max-width="450"
                rounded = "xl"
            >
                <div class="d-flex flex-column align-center">
                    <!-- Banner -->
                    <v-sheet
                        class="text-h4 font-noto-sans font-weight-bold d-flex justify-center align-center mt-4"
                        height="50"
                        width="400"
                        color="red-lighten-1"
                        rounded="xl"
                    >DRYER
                    </v-sheet>

                    <!-- Machine  -->
                    <div class="my-2 d-flex flex-row flex-wrap justify-center">
                        <v-sheet
                        v-for="machine,inx in dryerMachine"
                        :key="inx"
                        class="ma-2 d-flex align-center justify-center"
                        width="200"
                        height="260"
                        rounded="xl"
                        >
                            <!-- WASHER {{ inx }} -->
                            <AssetView  :asset="machine"/>
                        </v-sheet>
                    </div>
                </div>
            </v-sheet>  
        </div>
    </div>
</template>

<script setup lang="ts">
    import { AssetStatus, AssetProduct,AssetView } from '#components';
    import { type AssetData, sampleAssetsData } from '@@/data/assetData'

    definePageMeta({
        auth:false,
        layout:'blank'
    })

    const toggle = ref(0)




    const filterMachine = (items:AssetData[],type:string):AssetData[] => {
        return items.filter(item => item.assetType.code === type);
    }
    
    const dryerMachine = filterMachine(sampleAssetsData,'DRYER')

    const washerMachone =  filterMachine(sampleAssetsData,'WASHER')
    





</script>
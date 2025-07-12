<template>
    <!-- Cart shop info -->
    <v-sheet 
    class = "d-flex flex-row justify-start align-center mt-4 mx-4" 
    height="100" 
    >
        <!-- Machine Selected -->
        <v-sheet 
        class="d-flex flex-row bg-indigo-darken-3 mx-2 justify-center align-center" 
        height="80" 
        width="400" 
        rounded="pill"
        style="position: relative; z-index: 1;"
        >
            <div 
            class="text-h5 font-weight-medium text-center mt-1"
            style="position: absolute; top:30%; left:20%; transform: translate(-50%, -50%);"
            >
            MACHINE
            </div>

            <div 
            class="text-h5 font-weight-medium text-center mt-1"
            style="position: absolute; top:60%; left:20%; transform: translate(-50%, -50%);"
            >
            SELECTED
            </div>    

            <div>
                <v-img 
                src="/public/washer-icon.png" width="40" height="50"
                style="position: absolute; top:50%; left:47%; transform: translate(-50%, -50%);"
                />
                
                <!-- <div
                style="position: absolute; top:80%; left:47%; transform: translate(-50%, -50%);"
                >WASHER</div> -->

                <div 
                class="text-h2 font-weight-bold text-center "
                style="position: absolute; top:50%; left:60%; transform: translate(-50%, -50%);"
                >
                3
                </div>
            </div>

            <div>
                <v-img 
                src="/public/dryer-icon.png" width="40" height="50"
                style="position: absolute; top:50%; left:78%; transform: translate(-50%, -50%);"
                />
                
                <!-- <div
                style="position: absolute; top:80%; left:78%; transform: translate(-50%, -50%);"
                >DRYER</div> -->

                <div 
                class="text-h2 font-weight-bold text-center "
                style="position: absolute; top:50%; left:90%; transform: translate(-50%, -50%);"
                >
                3
                </div>
            </div>                

        </v-sheet>
        
        <!-- Total -->
        <v-sheet 
        class="d-flex flex-row bg-indigo-darken-3 mx-2 justify-center align-center" 
        height="80" 
        width="300" 
        rounded="pill"
        style="position: relative; z-index: 1;"
        >
            <div 
            class="text-h3 font-weight-bold mt-1"
            style="position: absolute; top:50%; left:35%; transform: translate(-50%, -50%);"
            >Total:
            </div>

            <div 
            class="text-h2 font-weight-bold text-center "
            style="position: absolute; top:50%; left:70%; transform: translate(-50%, -50%);"
            >30
            </div>
        </v-sheet>
      
        <!-- Payment -->
        <v-sheet
        class="bg-grey-lighten-4 d-flex flex-row justify-start align-center"
        width="800"
        height = "80"
        rounded="pill"
        >
            <div class="text-h4 mx-4 font-weight-bold">
                <v-icon>mdi-cash-register</v-icon>
                PAYMENT
            </div>

            <!-- ThaiQR -->
            <v-btn
            class="d-flex flex-row bg-blue-lighten-1 mx-2 justify-center align-center" 
            width="80"
            stacked
            rounded="xl"        
            >
                <v-icon size="30">mdi-qrcode</v-icon>
                <span>ThaiQR</span>
            </v-btn>

            <!-- CASH -->
            <v-btn
            class="d-flex flex-row bg-blue-darken-3 mx-2 justify-center align-center" 
            width="80"
            stacked
            rounded="xl"        
            >
                <v-icon size="30">mdi-cash</v-icon>
                <span>CASH</span>
            </v-btn>
            <!-- WECHAT -->
            <v-btn
            class="d-flex flex-row bg-blue-darken-3 mx-2 justify-center align-center" 
            width="80"
            stacked
            rounded="xl"        
            >
                <v-icon size="30">mdi-cash</v-icon>
                <span>WECHAT</span>
            </v-btn>
            <!-- ALIPAY -->
            <v-btn
            class="d-flex flex-row bg-blue-darken-3 mx-2 justify-center align-center" 
            width="80"
            stacked
            rounded="xl"        
            >
                <v-icon size="30">mdi-cash</v-icon>
                <span>ALIPAY</span>
            </v-btn>
        </v-sheet>

    </v-sheet>
    
    <div class="d-flex flex-column justify-center">
        <!-- Dryer -->
        <v-sheet
            class="d-flex justify-center bg-red-lighten-3 mx-5 mt-4"
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
                <div class="ma-2 d-flex flex-row flex-wrap justify-center">
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

        <!-- Washer -->
        <v-sheet
            class="d-flex justify-center bg-blue-lighten-3 mx-5 mt-4"
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
                <div class="ma-2 d-flex flex-row flex-wrap justify-center">
                    <v-sheet
                    v-for="machine,inx in washerMachone"
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
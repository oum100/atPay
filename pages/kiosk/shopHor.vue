<template>
    <!-- Cart shop info -->
    <v-container fluid>
        <!-- <v-sheet class="mx-1" color="grey-lighten-2"> -->
            <v-row class="mx-1 mt-2">
            <!-- Column 1: สีฟ้า -->
                <v-col cols="12" md="6" lg="6">
                    <v-sheet class="pa-2 text-center text-white" color="blue-darken-1" rounded>
                    <v-row align="center" no-gutters>
                        <v-col cols="4">
                            <div ><v-icon size="30">mdi-cart-variant</v-icon></div>
                            <div class="text-capital font-weight-bold">Order Selected</div>
                        </v-col>
                        <v-col cols="4" class="bg-blue-lighten-4 rounded-pill">
                            <v-row align="center" no-gutters >
                                <v-col cols="6" >
                                    <div ><v-icon size="35">mdi-washing-machine</v-icon></div>
                                    <div class="text-subtitle-2">Washer</div>
                                </v-col>
                                <v-col cols="4"><div class="text-h4">{{ cart.totalByTypeQty.WASHER }}</div></v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4" class="bg-red-lighten-4 rounded-pill">
                            <v-row align="center" no-gutters>
                                <v-col cols="6">
                                    <div><v-icon size="35">mdi-tumble-dryer</v-icon></div>
                                    <div class="text-subtitle-2">Dryer</div>
                                </v-col>
                                <v-col cols="4"><div class="text-h4">{{ cart.totalByTypeQty.DRYER }}</div></v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    </v-sheet>
                </v-col>

                <!-- Column 2 -->
                <v-col cols="12" md="6" lg="6" class="text-center">
                    <v-sheet class="pa-2 text-center" color="blue-darken-1" rounded>
                        <v-row no-gutters align="center">
                            <v-col cols="6">
                                <v-icon>mdi-cash-multiple</v-icon>
                                <div class="text-h6">Total price</div>
                            </v-col>
                            <v-col cols="6">
                                <div class="text-h4">{{cart.totalPrice}}</div>
                            </v-col>
                        </v-row>
                   
                    
                    </v-sheet>
                </v-col>


            </v-row>
            <v-row class="mx-1">
                                <!-- Column 3 -->
                <v-col cols="12"  class="text-center">
                    <v-sheet class="pa-2 text-center" color="blue-darken-1" rounded="lg">
                    <div class="text-h6 font-weight-bold">SELECT PAYMENT</div>
                    <div>
                        <v-btn stacked rounded="lg" class="ma-2" width="120" color="blue-lighten-1" @click="dialog=true">
                            <v-icon icon="mdi-qrcode"></v-icon>
                            Cash
                        </v-btn>
                        <v-btn stacked rounded="lg" class="ma-2" width="120" color="blue-lighten-1"><v-icon icon="mdi-qrcode" size="35"></v-icon>ThaiQR</v-btn>
                        <v-btn stacked rounded="lg" class="ma-2" width="120" color="blue-lighten-1"><v-icon icon="mdi-google"></v-icon>WeChatPay</v-btn>
                        <v-btn stacked rounded="lg" class="ma-2" width="120" color="blue-lighten-1"><v-icon icon="mdi-qrcode"></v-icon>Alipay</v-btn>
            
                    </div>

                    </v-sheet>
                </v-col>
            </v-row>
        <!-- </v-sheet> -->
    </v-container>
    
    <div class="d-flex flex-column justify-center">
        <!-- Dryer -->
        <v-sheet
            class="d-flex justify-center bg-red-lighten-3 mx-5 "
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
                    v-for="machine,inx in washerMachine"
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
  
    <!-- Payment Dialog -->
    <v-dialog v-model="dialog" max-width="600" >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Open Dialog"
            variant="flat"
            ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
            <v-card-text>
                Waiting for pay by cash {{ cart.totalPrice }}
                <div>
                    <v-btn @click="payCash"> Paid </v-btn>
                </div>
                
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>        
    </v-dialog>
</template>

<script setup lang="ts">
    import { AssetStatus, AssetProduct,AssetView } from '#components';
    import { type AssetData, sampleAssetsData } from '@@/data/assetData'  //Sample data from file
    import { useCartStore } from '@@/stores/cart';

    definePageMeta({
        auth:false,
        layout:'blank'
    })


    const shopAssetsData = ref<AssetData[]>([])
    shopAssetsData.value = [...sampleAssetsData]
    const cart = useCartStore()


    onMounted(()=>{
        //Get data from API


        //Check item inCart
        if(cart.totalItems){
            updateAssetState()
        }
    })


    const filterMachine = (items:AssetData[],type:string):AssetData[] => {
        return items.filter(item => item.assetType.code === type);
    }
    
    const dryerMachine = computed( () => filterMachine(shopAssetsData.value,'DRYER'))
    const washerMachine = computed( () => filterMachine(shopAssetsData.value,'WASHER'))
    

    // console.log("Dryer",dryerMachine)
    // console.log("Washer",washerMachine)


    function updateAssetState(){
        for(const item of cart.items){
            const inx = shopAssetsData.value.findIndex(asset => asset.name === item.name)
            
            if(inx !== -1) {
                shopAssetsData.value[inx].status = 'RESERVE'
                shopAssetsData.value[inx].pickedPrice = item.price
            }
        }
        console.log("shopHor->cart",cart.$state.items)
        console.log("shopHor->shopAssetsData",shopAssetsData)

    }


    const dialog = ref(false)


    // for test paid only
    function payCash() {
        if (cart.totalItems) {
            // เปลี่ยน status จาก 'RESERVE' → 'BUSY'
            for (const item of cart.items) {
                const index = shopAssetsData.value.findIndex(
                    asset => asset.assetId === item.id
                )

                if (index !== -1) {
                    shopAssetsData.value[index].status = 'BUSY'
                    shopAssetsData.value[index].serviceTime = item.serviceTime
                    // cart.removeItem(item.id)
                }
            }
            // console.log("Set Busy",shopAssetsData)
            // Clear cart (optional – ถ้าต้องการล้างหลังจ่าย)
            // cart.clearCart()

            dialog.value = false
        } else {
            alert("Cart Empty. Please select machine")
        }
    }


</script>
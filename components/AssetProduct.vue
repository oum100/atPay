<template>
    <!-- Status Bar -->
    <AssetStatus :status="props.asset.status" language="TH"/>

    <v-btn
        :disabled="isOffline || isBusy"
        width="70"
        height="70"
        rounded="circle"
        stacked
        :base-color="orderBtnColor"
        @click="clickOrder"
        style="position: absolute; top:45%; left:75%;  z-index: 1; transform: translate(-50%, -50%); justify-content: center;"
    >
        <v-icon size="25">mdi-cart</v-icon>
        <span class="font-noto-sans">{{ inCart ? 'CANCEL' : 'ORDER' }}</span>
    </v-btn>

    <v-sheet 
        width="196" height="140" 
        rounded="xl" 
        color="grey-lighten-4"
        style="position: absolute; top:72.5%; left:50%; z-index: -1; transform: translate(-50%, -50%);"
    >

        <!-- เวลาในการให้บริการ -->
        <v-chip 
        color="grey-lighten-2"
        variant="flat"
        rounded="xl"
        density="comfortable"
        style="position: absolute; top:46%; left:25%; width:92px; transform: translate(-50%, -50%); justify-content: center;"
        >
        <v-icon icon="mdi-clock-fast" color="red" size="25px" class="ml-1" />
        <span class="text-h6 font-noto-sans font-weight-medium">
            {{ currentProduct.time }}
        </span>
        <span class="text-caption font-noto-sans">M</span>
        </v-chip>

        <!-- อุณหภูมิ (mock เป็น 30°C) -->
        <v-chip 
        
        color="grey-lighten-2"
        variant="flat"
        density="comfortable"
        style="position: absolute; top:46%; left:75%; width:92px; transform: translate(-50%, -50%); justify-content: center;"
        >
            <v-icon icon="mdi-coolant-temperature" :color="tempColor" size="20px" />
            <span class="text-h6 font-noto-sans font-weight-medium">{{ currentProduct.temp }}</span>
            <span class="text-caption font-noto-sans">°C</span>
        </v-chip>

        <!-- ปุ่มราคา -->
        <v-btn-toggle
        v-model="toggle"
        divided
        rounded="xl"
        mandatory
        density="default"
        :color="priceBtnPressColor"
        :base-color="priceBtnBaseColor"
        style="position: absolute; top: 78%; left:50%; transform: translate(-50%, -50%);"
        >
            <v-btn
                :disabled="inCart || isOffline || isBusy"
                v-for="(product, index) in props.asset.products"
                :key="index"
                class="text-h4 font-noto-sans font-weight-bold"
                width="40"
                :value="Number(product.price)"
            >
                {{ product.price }}
            </v-btn>
        </v-btn-toggle>
    </v-sheet>

</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { AssetStatus } from '#components';
    import { type AssetData } from '~/data/assetData'
    import { useCartStore, type CartItemType } from '@/stores/cart'


    const props = defineProps<{
        asset: AssetData
    }>()
    
    const cart = useCartStore()

    const toggle = ref<number>(
        props.asset.products[0]?.price ?? props.asset.pickedPrice ?? 0
    )


    watch(toggle, (newPrice) => {
        if (typeof newPrice === 'number') {
            props.asset.pickedPrice = newPrice
        }
    })

    watch(
        () => props.asset.pickedPrice,
        (newPrice) => {
            if (newPrice != null && newPrice !== toggle.value) {
            toggle.value = newPrice
            }
        }
    )    
   

    // ดึง product ปัจจุบันที่เลือก
    // const currentProduct = computed(() => props.asset.products[0])
    const currentProduct = computed(() => {
        return (
            props.asset.products.find(p => p.price === toggle.value) ?? 
            props.asset.products[0] // fallback ไปตัวแรกเสมอ
        )
    })


    //Setting Order button
    // const inCart = computed(() => props.asset.status === 'RESERVE')

    const inCart = computed({
        get: () => props.asset.status === 'RESERVE',
        set: (val: boolean) => {
            props.asset.status = val ? 'RESERVE' : 'AVAILABLE'
        }
    })

    //assetType
    const assetType = props.asset.assetType.code.toUpperCase()
    const priceBtnBaseColor = assetType == 'WASHER'?'blue-darken-3':'red-darken-3'
    const priceBtnPressColor = assetType == 'WASHER'?'blue-lighten-1':'red-lighten-1'


    //ปรับสี icon temperature ตามอุณหภูมิ
    const tempColor = computed(() => {
        const temp = currentProduct.value?.temp ?? 30
        if (temp <= 30) return 'blue'
        if (temp <= 50) return 'orange'
        return 'red'
    })

    //Set Button color follow by type of asset

    const orderBtnColor = computed(() => {
        const isReserved = props.asset.status.toUpperCase() === 'RESERVE'
        const isWasher = props.asset.assetType.code === 'WASHER'

        if (isReserved) {
            return isWasher ? 'grey-darken-3' : 'grey-darken-3'
        } else {
            return isWasher ? 'blue-darken-3' : 'red-darken-3'
        }
    }) 

    const isOffline = computed(() => props.asset.status.toUpperCase() === 'OFFLINE')
    const isBusy = computed(() => props.asset.status.toUpperCase() === 'BUSY'?true:false)

    const clickOrder = () => {
        inCart.value = !inCart.value

        if (inCart.value) {

            cart.addItem({
                id: props.asset.assetId,
                name: props.asset.name,
                type: props.asset.assetType.code.toUpperCase() as CartItemType,
                price: toggle.value,
                serviceTime: props.asset.products.find(item => item.price === toggle.value)?.time ?? 0
            })
        } else {
            cart.removeItem(props.asset.assetId)
        }
    }

</script>



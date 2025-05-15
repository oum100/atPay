<template>
    
    <v-sheet color="white" height="917" width="320" class="text-center mx-auto">
            <h2 class="text-h4 mt-2 font-weight-black text-orange">Welcome {{ profile?.name }}</h2>

            <div class="my-2">
                <v-avatar size="70">
                    <!-- <v-img
                        alt="John"
                        src="https://cdn.vuetifyjs.com/images/john.png"
                    >
                    </v-img> -->
                    <v-img
                        alt="User profile"
                        :src="profile?.pictureUrl"
                    >
                    </v-img>
                </v-avatar>
            </div> 
        
            <div>
                <div class="text-h5 font-noto-sans font-weight-medium" font-uppercase>{{ assetPick.assetType }}: <span class="font-weight-black">{{ assetPick.assetId }}</span></div>
                
                <!-- <div class="mx-auto text-h4 font-kanit font-weight-bold ">{{ assetPick.assetId }}</div> -->
                <div class="text-h6 font-noto-sans">เลือกราคา <span class="font-weight-bold">(Select Price)</span></div>
                <!-- <div class="text-h6 text-red font-noto-sans">Select Price.</div> -->
                <div class="text-h6 font-noto-sans">請選擇服務</div>

            </div>

            <v-card variant="plain" >
                <v-img src="/assets/images/Washer-1.png" height="350">

                    <v-chip
                        :model-value=inCart
                        class="font-sriracha"
                        color="warning"
                        variant="flat"
                        prepend-icon="mdi-checkbox-marked-circle"
                        style="position: absolute; top: 12%; left: 30%; transform: translate(-50%, -50%)"
                    >
                        RESERVED
                    </v-chip>

                    <v-sheet class="mx-auto pa-2 text-left text-white" 
                        height="120" 
                        max-width="220"
                        width="80%"
                        rounded="shaped"
                        style="
                            background-color: rgba(0, 0, 0, 0.5); position: relative;
                            position: absolute; top:36%; left: 50%; transform: translate(-50%, -50%);
                        "
                        
                        elevation="20"
                    >
                        <div class="text-h4 font-sriracha">Price(฿): {{ assetPick.product.price }}</div>
                        <div class="text-h6 font-sriracha">Time(Min): {{ assetPick.product.time }} </div>
                        <div class="text-h6 font-sriracha">Temp(C°): {{ assetPick.product.temp }}</div>
                    </v-sheet>
                    
                    <div class="d-flex align-center flex-column ">
                        <v-btn-toggle
                            :disabled="inCart"
                            v-model="toggle"
                            divided
                            rounded="xl"
                            mandatory
                            base-color="blue"
                            style="position: absolute; top: 68%; left: 50%; transform: translate(-50%, -50%);"
                            @click = "pressBtn"
                        >
                        <v-btn class="text-h4 font-kanit font-weight-medium">{{ asset?.products[0].price }}</v-btn>
                        <v-btn class="text-h4 font-kanit font-weight-medium">{{ asset?.products[1].price }}</v-btn>
                        <v-btn class="text-h4 font-kanit font-weight-medium">{{ asset?.products[2].price }}</v-btn>
                        </v-btn-toggle>
                    </div>

                    <v-btn 
                        :disabled="!inCart"
                        class="mt-4 text-h6 font-kanit font-weight-bold" 
                        rounded="xl" 
                        width="120" 
                        height="40"
                        style="position: absolute; top: 82%; left: 30%; transform: translate(-50%, -50%);"
                        @click="checkOut"
                        >PAYMENT
                    </v-btn>
                    <v-btn 
                        v-if="!inCart"
                        class="mt-4 text-h6 font-kanit font-weight-bold" 
                        rounded="xl" 
                        color="green"
                        height="40"
                        style="position: absolute; top: 82%; left: 70%; transform: translate(-50%, -50%);"
                        prepend-icon = "mdi-cart"
                        @click = "addCart"
                        >ADD
                    </v-btn>
                    <v-btn 
                        v-if="inCart"
                        class="mt-4 text-h6 font-kanit font-weight-bold" 
                        rounded="xl" 
                        color="red"
                        height="40"
                        style="position: absolute; top: 82%; left: 70%; transform: translate(-50%, -50%);"
                        prepend-icon = "mdi-cart"
                        @click = "addCart"
                        >NULL
                    </v-btn>
                </v-img>
            </v-card>
    </v-sheet>
    
</template>

<script setup lang="ts">
    import liff from '@line/liff'

    definePageMeta({
        auth:false,
        layout:'blank'
    })

    const route = useRoute()

    let assetPick = ref({
        assetId: ref(''),
        assetType: ref(''),
        product: {
            price:ref(0),
            time:ref(0),
            temp:ref(0),
            unit:ref('')
        }
    })


    const toggle = ref(1)
    const inCart = ref(false)
    const assetData = ref([
        {
            assetId: 'DR-001',
            assetType: 'DRYER',
            products: [
            { price: 40, time: 60, temp: 70, unit: 'min' },
            { price: 50, time: 75, temp: 70, unit: 'min' },
            { price: 60, time: 90, temp: 70, unit: 'min' },
            ],
        },
        {
            assetId: 'WM-002',
            assetType: 'WASHER',
            products: [
            { price: 30, time: 36, temp: 30, unit: 'min' },
            { price: 40, time: 60, temp: 40, unit: 'min' },
            { price: 50, time: 90, temp: 60, unit: 'min' },
            ],
        },
    ])

    const machineId = route.params.machine as string
    const profile = ref<any>(null)
    const error = ref('')
    const loading = ref(true)

    onMounted(async () => {
        try {
            // const liff_id = useRuntimeConfig().line_liff_id
            const liff_id = '1656517227-vB0Gk4zY'
            await liff.init({ liffId: liff_id }) // 👈 ใช้ LIFF ID จริง
            if (!liff.isLoggedIn()) liff.login()
            
            const user = await liff.getProfile()
            profile.value = {
            name: user.displayName,
            userId: user.userId,
            pictureUrl: user.pictureUrl,
            machineId,
            }

            console.log("Line Profile: ", profile.value)
        } catch (e: any) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    })

    const selectedAsset = computed(() => {
        return assetData.value.find((a) => a.assetId === machineId)
    })

    const asset = selectedAsset.value
    // console.log("machine: ",route.params.machine)
    // console.log("Asset: ",asset)


    onMounted( () => {
        assetPick.value.assetId = asset?.assetId as string
        assetPick.value.assetType = asset?.assetType as string
        assetPick.value.product.price = asset?.products[toggle.value].price as number
        assetPick.value.product.time = asset?.products[toggle.value].time as number
        assetPick.value.product.temp = asset?.products[toggle.value].temp as number
        assetPick.value.product.unit = asset?.products[toggle.value].unit as string
    })

    const pressBtn = () => {
        // price.value = asset.value.products[toggle.value].price
        // time.value = asset.value.products[toggle.value].time
        // temp.value = asset.value.products[toggle.value].temp    
        assetPick.value.product.price = asset?.products[toggle.value].price as number
        assetPick.value.product.time = asset?.products[toggle.value].time as number
        assetPick.value.product.temp = asset?.products[toggle.value].temp as number
        assetPick.value.product.unit = asset?.products[toggle.value].unit as string
    }

    const checkOut = () => {

    }

    const addCart = () => {
        inCart.value = !inCart.value
    }

</script>

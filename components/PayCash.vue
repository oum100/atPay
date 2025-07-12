<template>
    <!-- <div class="d-flex justify-center align-center">
        <v-card>

        </v-card>
    </div> -->
    <v-dialog v-model="dialog" max-width="600">

    </v-dialog>
</template>

<script setup lang="ts">
    import { type AssetData } from '~/data/assetData'
    import { useCartStore, type CartItemType } from '@/stores/cart'


    const props = defineProps<{
        dialog:boolean
        cart:CartItemType
        asset: AssetData[]
    }>()


    const dialog = ref(props.dialog)

</script>
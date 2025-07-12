import { defineStore } from 'pinia'
import { type AssetData, sampleAssetsData } from '@@/data/assetData'

export enum CartItemType {
  WASHER = 'WASHER',
  DRYER = 'DRYER',
  OTHER = 'OTHER'
}

export interface CartItem {
  id: string
  name: string
  type: CartItemType
  price: number
  serviceTime: number
  quantity: number
}

interface CartState {
  userId: string
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    userId: '',
    items: []
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    totalByType: (state) => {
      const result: Record<CartItemType, number> = {
        [CartItemType.WASHER]: 0,
        [CartItemType.DRYER]: 0,
        [CartItemType.OTHER]: 0
      }
      for (const item of state.items) {
        result[item.type] += item.price * item.quantity
      }
      return result
    },

    totalByTypeQty: (state) => {
      const result: Record<CartItemType, number> = {
        [CartItemType.WASHER]: 0,
        [CartItemType.DRYER]: 0,
        [CartItemType.OTHER]: 0
      }
      for (const item of state.items) {
        result[item.type] += item.quantity
      }
      return result
    }
  },

  actions: {
    setUser(userId: string) {
      if (this.userId !== userId) {
        this.userId = userId
        this.items = [] // 🧹 reset cart เมื่อเปลี่ยน user
      }
    },

    addItem(product: { id: string; name: string; type: CartItemType; price: number; serviceTime:number}) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeItem(id: string) {
      this.items = this.items.filter(item => item.id !== id)
    },

    updateQuantity(id: string, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.items = []
    }
  },

  persist:{
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['userId', 'items'],
  }

})

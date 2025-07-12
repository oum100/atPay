<template>
  <v-container class="d-flex justify-center" >
    <v-card  class="pa-6" width="500" rounded="xl">
      <v-form v-model="valid">

        <!-- บริการที่ต้องการ -->
        <div class="d-flex flex-row">
            <v-checkbox v-model="form.wash" label="ซักผ้า (Wash)" />
            <v-checkbox v-model="form.dry" label="อบผ้า (Dry)" />
             <v-checkbox v-model="form.fold" label="พับผ้า (Fold)" />
        </div>


        <!-- ซักผ้า -->
        <template v-if="form.wash">
          <v-divider class="my-4" />
          <h3 class="text-h6 font-weight-bold">รายละเอียดการซัก</h3>
          <div class="d-flex flex-row">
            <v-select
                class="pa-1"
                v-model="form.washType"
                label="เวลาซัก (นาที)"
                :items="['30', 'ุุ60', '90']"
            />
            <v-select
                class="pa-1"
                v-model="form.waterTemp"
                label="อุณหภูมิน้ำ"
                :items="['Cold', 'Warm', 'Hot']"
            />
          </div>
          <div>ปริมาณไม่เหมาะสม ส่งผลให้เร่งรอบปั่นหมาดไม่ได้</div>
        <!-- แยกผ้า -->
            <v-divider class="my-4" />
            <h3 class="text-h6 font-weight-bold">การแยกซักผ้า</h3>
            <div class="d-flex flex-row ">
                <v-checkbox v-model="form.sepTopButtom" label="ส่วนบน/ส่วนล่าง" />
                <v-checkbox v-model="form.sepWhiteColor" label="ผ้าขาว/ผ้าสี" />
                <v-checkbox v-model="form.sepThinThick" label="ผ้าผื้นใหญ่/ผ้าอมน้ำ" />
            </div>          
        </template>

        <!-- อบผ้า -->
        <template v-if="form.dry">
          <v-divider class="my-4" />
          <h3 class="text-h6 font-weight-bold">รายละเอียดการอบ</h3>
          <div class="d-flex flex-row">
            <v-select
                class="pa-1"
                v-model="form.dryTemp"
                label="ระดับความร้อน"
                :items="['ต่ำ', 'ปานกลาง', 'สูง']"
            />
            <v-select
                class="pa-1"
                v-model="form.dryTime"
                label="ระยะเวลา"
                :items="['30 นาที', '45 นาที', '60 นาที']"
            />
            
          </div>
            <div>ปริมาณไม่เหมาะสม ส่งผลให้ผ้าไม่แห้งได้</div>
        </template>

        <!--ผ้าเยอะ -->
        <v-divider class="my-4" />
        <h3 class="text-h6 text-red font-weight-bold">หมายเหตุ</h3>
        <div class="d-flex flex-row text-red ">
            <v-checkbox v-model="form.moreMachine" label="กรณีมีปริมาณผ้าเกิน แบ่งซ้กอบเครื่อง คิดค่าบริการเพิ่มได้" />
        </div>        

        <!-- ข้อมูลลูกค้า -->
        <v-divider class="my-4" />
        <h3 class="text-h6 font-weight-bold">ข้อมูลลูกค้า</h3>
        <div class="d-flex flex-row">
            <v-text-field class="pa-1" v-model="form.customerName" label="ชื่อลูกค้า" />
            <v-text-field class="pa-1" v-model="form.phone" label="เบอร์โทร" type="tel" />
        </div>


        <!-- ปุ่มยืนยัน -->
        <div class="d-flex justify-center">
            <v-btn class="mt-4" color="primary" :disabled="!valid" @click="submit">
            ยืนยันบริการ
            </v-btn>
        </div>


      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
    layout: 'blank'
})

const valid = ref(false)
const form = reactive({
  wash: true,
  dry: true,
  fold: true,
  washType: '',
  waterTemp: '',
  dryTemp: '',
  dryTime: '',
  sepWhiteColor: false,
  sepThinThick: false,
  sepTopButtom: false,
  moreMachine: false,
  customerName: '',
  phone: ''
})

function submit() {
  console.log('ข้อมูลฟอร์ม:', form)
  // ส่งไป backend หรือ redirect ไปหน้าสรุป
}
</script>

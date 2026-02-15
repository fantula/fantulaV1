<template>
  <div class="p-4">
    <h2>Product Debug</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
       <table border="1" cellpadding="4">
         <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Cat ID</th></tr></thead>
         <tbody>
           <tr v-for="p in products" :key="p.id">
             <td>{{ p.id }}</td>
             <td>{{ p.product_name }}</td>
             <td>{{ p.product_type }}</td>
             <td>{{ p.category_id }}</td>
           </tr>
         </tbody>
       </table>
       
       <h3>Query Params</h3>
       <pre>{{ route.query }}</pre>

       <h3>Type Map Check</h3>
       <p>Query Type: {{ route.query.type }}</p>
       <p>Mapped Type: {{ targetType }}</p>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { adminProductApi } from '@/api/admin'

const route = useRoute()
const products = ref([])
const loading = ref(true)

const typeMap = { 'virtual': 'virtual', 'shared': 'shared_account', 'one_time': 'one_time_cdk' }
const targetType = computed(() => route.query.type ? typeMap[route.query.type] : 'N/A')

onMounted(async () => {
    const res = await adminProductApi.getProducts()
    // Dump raw data to see if product_type exists
    console.log('Raw Products:', res.products)
    products.value = res.products
    loading.value = false
})
</script>

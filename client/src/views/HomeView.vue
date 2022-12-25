<template>
  <div>
    <product />
    <relatedProducts />
  </div>
</template>
<script>
import relatedProductsVue from '../components/relatedProducts.vue'
import productVue from '../components/product.vue'
export default {
  name: 'HomeView',
  components: {
    product: productVue,
    relatedProducts: relatedProductsVue,
  },
}
</script>
<style></style>

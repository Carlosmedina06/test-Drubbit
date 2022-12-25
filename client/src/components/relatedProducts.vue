<template>
  <div class="relatedProducts">
    <h1 class="title">TAMBIEN TE PUEDE INTERESAR</h1>
    <v-slide-group class="pa-4" show-arrows>
      <v-slide-item
        v-for="Product in relatedProducts"
        :key="Product.id"
        v-slot="{ toggle }"
      >
        <v-card
          :color="toggle ? 'white' : 'white'"
          class="ma-4 card"
          height="400"
          width="230"
          @click="toggle"
        >
          <div class="discount">
            <p class="discountP">-{{ Product.price.discount[0] }}%</p>
            <p class="heart">♡</p>
          </div>
          <v-img v-bind:src="Product.img" :alt="Product.name" />
          <p class="base">
            $
            {{ Product.price.base[0] }}
          </p>
          <p class="price">${{ Product.price.price[0] }}</p>
          <p class="name">{{ Product.name }}</p>
          <v-btn class="btn" large
            ><v-icon v-text="'mdi-cart-outline'"></v-icon> buy now</v-btn
          >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="toggle"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  name: 'relaredProducts',
  data() {
    return {
      relatedProducts: [],
    }
  },
  created() {
    fetch('http://localhost:3001/product')
      .then((response) => response.json())
      .then((data) => {
        this.relatedProducts = data.data.relatedProducts.map((e) => {
          return {
            id: e.id,
            name: e.name,
            img: e.mainImage.originalUrl,
            second: e.secondImage?.originalUrl,
            price: {
              discount: e.variants.map((p) => p.pvPrice.discountPct),
              base: e.variants.map((p) => p.pvPrice.basePrice),
              price: e.variants.map((p) => p.pvPrice.price),
            },
          }
        })
      })
  },
}
</script>

<style>
.relatedProducts {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
}
.title {
  border-bottom: 2px solid #f5303d;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2.5px;
  color: #f5303d;
}
.card {
  margin: 40px 10px;
  position: relative;
  overflow: hidden;
}

.discount {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  position: absolute;
  width: 100%;
}
.discountP {
  background-color: #9980ce;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  overflow: hidden;
  border-radius: 7%;
}
.heart {
  background-color: rgb(231, 231, 231);
  color: #9980ce;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  text-align: center;
  margin: 5px;
  font-size: 20px;
  transition: all 0.2s ease-in;
}
.heart:hover {
  background-color: rgb(184, 180, 180);
}
.base {
  font-size: 14px;
  margin: 0 10px;
  text-decoration: line-through;
  color: #8a8a8a;
}
.price {
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  letter-spacing: 2.5px;
}
.name {
  text-align: center;
  font-weight: bold;
  font-size: 10px;
  padding: 18px 20px;
}
.btn {
  background-color: #fff !important;
  box-shadow: none;
  height: 40px;
  padding: 0;
  min-width: 78px;
  width: 100%;
  border-top: 2px solid #f0ecec;
  border-radius: 0;
}
</style>

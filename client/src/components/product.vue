<template>
  <v-app>
    <v-container class="p-1">
      <v-card class="ma-5 pa-5">
        <v-row class="d-flex justify-space-around">
          <v-col cols="7">
            <v-img
              class="minImg ma-5 rounded"
              max-height="70"
              max-width="70"
              v-bind:src="products.img"
            ></v-img
            ><v-img class="ma-5 img" v-bind:src="products.img"></v-img>
          </v-col>
          <v-divider class="my-2" vertical></v-divider>
          <v-col cols="4">
            <div class="pa-2 breadcrumbs">
              <v-breadcrumbs :items="categories" divider="/"></v-breadcrumbs>
            </div>
            <v-row>
              <v-col cols="10">
                <div>
                  <h1 class="productTitle text--darken-2 font-weight-bold">
                    {{ products.name }}
                  </h1>
                  <p
                    class="d-inline-block sku grey lighten-4 rounded font-weight-bold px-2 mt-2"
                  >
                    SKU {{ products.sku }}
                  </p>
                  <p class="mb-4 brand text-uppercase font-weight-bold">
                    {{ products.brand }}
                  </p>
                </div>
                <p class="basePrice text-decoration-line-through">
                  $ {{ products.basePrice }}
                </p>
                <div class="d-flex align-center">
                  <p class="price">
                    $ {{ products.price }}
                    <span class="font-weight-bold"
                      >{{ products.discount }}% OFF</span
                    >
                  </p>
                </div>
                <div class="py-2">
                  <p v-if="products.stock > 0">
                    <v-icon v-text="'mdi-check'"></v-icon> Disponible en stock
                  </p>
                  <p>
                    <v-icon v-text="'mdi-credit-card'"></v-icon>
                    18 cuotas sin interes
                  </p>
                </div>
                <v-divider class="mb-5"></v-divider>
                <div class="d-flex align-center mb-5 productInput">
                  <v-icon slot="prepend"> mdi-minus </v-icon>
                  <v-text-field
                    class="v-input rounded-0 v-input--hide-details v-input--is-label-active v-input--is-dirty v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--is-booted v-text-field--enclosed"
                    hide-details
                    placeholder="1 unidad"
                    type="text"
                  />
                  <v-icon slot="append"> mdi-plus </v-icon>
                </div>
                <p v-if="(products.stock = 1)">Última disponible!</p>
                <v-btn class="btnComprar px-10 py-5"
                  ><v-icon v-text="'mdi-cart-outline'"></v-icon> COMPRAR AHORA
                </v-btn>
                <v-divider class="my-10"></v-divider>
                <div>
                  <p class="d-flex mb-5">
                    <v-icon
                      class="mx-5"
                      v-text="'mdi-package-up'"
                      color="blue"
                    ></v-icon>
                    Retiro gratis en nuestro local. Rico 640, Dolores, Prov de
                    Buenos Aires
                  </p>
                  <div class="d-flex">
                    <v-icon
                      class="mx-5"
                      v-text="'mdi-truck-fast'"
                      color="blue"
                    ></v-icon>
                    <p class="d-flex flex-column mb-5 align-center">
                      Envío a domicilio. Consultenós el costo a su localidad.
                      <span class="textSpan"
                        >Realizamos envíos a Dolores y zona con nuestra propia
                        flota de camiones. LLegamos a Castelli, Lezama, Pila,
                        Chascomús, Gral. Guido, Maipú, Gral. Conesa, Lavalle y
                        el Partido de la Costa. Por otros destinos consulte
                        antes de realizar su compra.</span
                      >
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col class="text-right d-flex flex-column" cols="2">
                <v-btn
                  class="mb-2 v-btn v-btn--fab v-btn--has-bg v-btn--round theme--light elevation-0 v-size--small"
                >
                  <v-icon
                    class="heart"
                    color="purple"
                    v-text="'mdi-heart'"
                  ></v-icon>
                </v-btn>
                <v-btn
                  class="mb-2 v-btn v-btn--fab v-btn--has-bg v-btn--round theme--light elevation-0 v-size--small"
                >
                  <v-icon
                    class="shared"
                    color="purple"
                    v-text="'mdi-share-variant-outline'"
                  ></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'product',
  data() {
    return {
      products: [],
      categories: [],
    }
  },
  created() {
    fetch('http://localhost:3001/product')
      .then((response) => response.json())
      .then((data) => {
        this.categories = data.data.product.categories.map((c) => {
          return {
            text: c.name,
            disabled: false,
            href: c.urlName,
          }
        })
        this.products = {
          id: data.data.product.id,
          name: data.data.product.name,
          brand: data.data.product.brand.name,
          sku: data.data.product.variants[0].sku,
          stock: data.data.product.variants[0].stock.qty,
          basePrice: data.data.product.variants[0].pvPrice.basePrice,
          discount: data.data.product.variants[0].pvPrice.discountPct,
          price: data.data.product.variants[0].pvPrice.price,
          img: data.data.product.images[0].originalUrl,
          minImg: data.data.product.images[0].squareUrl,
        }
      })
  },
}
</script>

<style>
.minImg {
  border: solid 2px #461e8c;
  border-radius: 6px;
  padding: 20px;
  cursor: pointer;
}

.brand {
  color: #461e8c;
}

.sku {
  font-size: 12px;
}

.basePrice {
  color: #8c8989;
  font-size: 14px;
}

.price {
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: bold;
}

.price span {
  font-size: 14px;
  color: #f44336;
}

.productInput {
  border: solid black 1px;
  width: 60%;
  height: 40px;
  padding: 10px;
}
.productInput input {
  text-align: center;
}

.btnComprar {
  background-color: #f6c1dd !important;
  width: 100%;
  color: #461e8c !important;
  border-radius: 50px;
}

.img {
  cursor: pointer;
}

.textSpan {
  font-size: 10px;
}

.heart,
.shared {
  cursor: pointer;
}
</style>

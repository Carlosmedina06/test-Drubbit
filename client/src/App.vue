<template>
  <div id="app">
    <header>
      <v-app-bar dense dark>
        <v-toolbar-title>TEST</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/">
          <v-btn> Product </v-btn>
        </router-link>
        <v-btn>
          <v-icon v-text="'mdi-cart-outline'"></v-icon>
        </v-btn>
      </v-app-bar>
    </header>
    <router-view />
  </div>
</template>

<script></script>

<style>
nav {
  background-color: #fff;
  margin: 10px 0;
}
</style>

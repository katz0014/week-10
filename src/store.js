import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    PRODUCTS_SOLD(state, data) {
      // update the product quantity in the state
      const productIndex = this.getters.getProductIndex(data.product.id);
      state.products[productIndex].quantity -= data.quantity;
      // the line above is the same as writing this
      // state.products[productIndex].quantity = state.products[productIndex].quantity- data.quantity;
      // make API call to update the DB
      axios
        .put(
          "https://week-10-4e3b9.firebaseio.com/products.json",
          state.products
        )
        .then(response => {
          console.log("Your data was updated " + response.status);
        })
        .catch(error => {
          console.log("There was an issue saving your data " + error.response);
        });
    },
    PRODUCT_QUANTITY(state, data) {
      // get the index of the product from the array of products
      const productIndex = this.getters.getProductIndex(data.product.id);
      // updatePRODUCT_QUANTITY(state, data) {
      // get the index of the product from the array of products
      // update the quantity of the product at the found index
      state.products[productIndex].quantity = data.quantity;
      // make API call to update the database
      axios
        .put(
          "https://week-10-4e3b9.firebaseio.com/products.json",
          state.products
        )
        .then(response => {
          console.log("Your data was updated " + response.status);
        })
        .catch(error => {
          console.log("There was an issue saving your data " + error.response);
        });
    }
  },

  actions: {
    fetchData({ commit }) {
      axios
        .get("https://week-10-4e3b9.firebaseio.com/products.json")
        .then(response => {
          console.log(response.data);
          commit("SET_PRODUCTS", response.data);
        });
    },
    buyProducts({ commit }, { quantity, product }) {
      commit("PRODUCTS_SOLD", {
        quantity,
        product
      });
    },
    updateQuantity({ commit }, { quantity, product }) {
      // commit the mutation to update the state, sending the payload as {quantity, product }
      commit("PRODUCT_QUANTITY", {
        quantity,
        product
      });
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    getProductIndex: state => id => {
      return state.products.findIndex(product => product.id === id);
    }
  }
});
//https://week-10-4e3b9.firebaseio.com/

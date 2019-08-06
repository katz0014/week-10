<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <h6
        class="card-subtitle mb-2 text-muted"
      >Price: &#36;{{ product.price }} &vert; In Stock {{ product.quantity }}</h6>
      <p class="card-text">{{ product.description }}</p>
      <router-link
        :to="{name: 'single-product', params: {id: product.id}}"
        class="card-link btn btn-success"
      >Details</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product"]
};
</script>

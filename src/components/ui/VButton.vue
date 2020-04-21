<template>
  <button v-on="$listeners" v-bind="$attrs" class="btn">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'VButton'
};
</script>

<style>
.btn {
  border: 1px solid lightblue;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: lightsalmon;
  color: #fff;
  font-size: 0.9rem;
  transition: 0.3s transform;
}
.btn:not(:first-child) {
  margin-left: 1rem;
}
.btn:hover {
  transform: translateY(3px);
}
</style>

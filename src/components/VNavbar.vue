<template>
  <div class="navbar">
    <h1 class="text-center main-head">
      Vue text editor
    </h1>
  </div>
</template>

<script>
export default {
  name: 'VNavbar'
};
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: teal;
}
.main-head {
  color: #fff;
}
</style>

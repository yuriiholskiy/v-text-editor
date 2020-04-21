<template>
  <div>
    <v-button class="mt-2" @click="addInfo = !addInfo">
      {{ text }} additional info
    </v-button>
    <v-button @click="$emit('show-result')">Show result(json)</v-button>
    <transition mode="out-in">
      <div class="add-info" v-if="addInfo">
        To change color/font-size:
        <ol>
          <li>
            pick color, or font-size;
          </li>
          <li>
            select text You want to interact with;
          </li>
          <li>
            click on the corresponding button
          </li>
        </ol>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VAddInfo',
  data() {
    return {
      addInfo: false
    };
  },
  computed: {
    text() {
      return this.addInfo ? 'Hide' : 'Show';
    }
  }
};
</script>

<style>
.add-info {
  position: fixed;
  bottom: 2rem;
  left: 0;
  font-size: 0.9rem;
}
.add-info-btn {
  display: block;
}
.v-enter-active,
.v-leave-active {
  transition: 0.3s transform ease-in-out;
}
.v-enter,
.v-leave-to {
  transform: translateX(-500px);
}
</style>

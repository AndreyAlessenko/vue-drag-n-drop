<template>
  <div style="height: 100vh">
    <div style="height: 50%">
      <SvgDrawerContainer />
    </div>
    <div class="px-2" style="height: 40%">
      <LoggerContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoggerContainer from './LoggerContainer.vue'
import SvgDrawerContainer from './SvgDrawerContainer.vue'
</script>

<style>
@import '../assets/style.css';
</style>

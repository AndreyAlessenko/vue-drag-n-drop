<template>
  <div class="logger">
    <div class="mb-1 d-fex justify-space-between">
      Логгер:
      <button @click="clearLog">Очистить</button>
    </div>
    <div class="logger-data">
      <div v-for="log in loggerArray" :key="String(log.date)">
        <div>{{ log.date }}</div>
        <div>{{ log.message }}</div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLogerStore } from '../store/logger'

const { loggerArray } = storeToRefs(useLogerStore())
const { clearLog } = useLogerStore()
</script>

<style scoped>
.logger {
  max-width: 100%;
  height: 100%;
  border: 3px solid black;
  border-radius: 15px;
  padding: 10px;
}
.logger-data {
  overflow-y: auto;
  height: 80%;
}
</style>

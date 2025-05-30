import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LoggerItem } from '../types/index'

export const useLogerStore = defineStore('loger', () => {
  const loggerArray = ref<LoggerItem[]>([])

  function clearLog() {
    console.log(2222)
    loggerArray.value = []
  }

  return { loggerArray, clearLog }
})

<template>
  <div ref="container" class="svg-container"></div>
</template>

<script setup lang="ts">
import { SVG, Svg, G } from '@svgdotjs/svg.js'
import { onMounted, ref, onUnmounted } from 'vue'
import '@svgdotjs/svg.draggable.js'
import { useLogerStore } from '../store/logger'
import { storeToRefs } from 'pinia'

const { loggerArray } = storeToRefs(useLogerStore())

const container = ref<HTMLDivElement>()
let draw: Svg | null = null
let canvas: G | null = null

const createAddButton = (draw: G) => {
  const button = draw.group()
  const circle = button.circle(40).fill('#4CAF50').move(20, 20)
  button
    .text('+')
    .fill('white')
    .font({
      family: 'Arial',
      size: 30,
      anchor: 'middle',
    })
    .move(30, 24)

  button.mouseover(() => circle.fill('#45a049'))
  button.mouseout(() => circle.fill('#4CAF50'))
  button.click(addSquare)
  return button
}

const createCanvas = () => {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight - 20

  if (draw) {
    draw.remove()
  }
  draw = SVG().addTo(container.value).size(width, height)
  draw
    .rect(width - 20, height - 20)
    .move(10, 10)
    .fill('none')
    .stroke({ color: 'blue', width: 2 })
  const clipRect = draw.rect(width - 20, height - 20).move(10, 10)
  const clip = draw.clip().add(clipRect)
  canvas = draw.group().clipWith(clip)

  createAddButton(canvas)
}
const addSquare = () => {
  if (!canvas || !container.value) return
  const width = container.value.clientWidth
  const height = container.value.clientHeight - 20
  const squareSize = 100
  const centerX = (width - squareSize) / 2
  const centerY = (height - squareSize) / 2

  const rect = canvas
    .rect(squareSize, squareSize)
    .move(centerX, centerY)
    .fill('#f06')
    .stroke({ color: 'black', width: 2 })
    .radius(5)
    .draggable()

  rect.on('beforedrag ', () => {
    loggerArray.value.unshift({
      date: new Date(),
      message: 'Начало перемещения квадрата',
    })
  })

  rect.on('dragend ', () => {
    loggerArray.value.unshift({
      date: new Date(),
      message: 'Конец перемещения квадрата',
    })
  })

  loggerArray.value.unshift({
    date: new Date(),
    message: 'Добавлен квадрат',
  })
}
const handleResize = () => {
  createCanvas()
}

onMounted(() => {
  createCanvas()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.svg-container {
  width: 100%;
  height: 100%;
}
</style>

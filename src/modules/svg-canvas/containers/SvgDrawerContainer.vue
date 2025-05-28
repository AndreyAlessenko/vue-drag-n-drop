<template>
  <div ref="container" class="svg-container"></div>
</template>

<script setup lang="ts">
import { SVG, Svg, G } from '@svgdotjs/svg.js'
import { onMounted, ref, onUnmounted } from 'vue'
import '@svgdotjs/svg.draggable.js'

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

  const width = window.innerWidth - 20
  const height = window.innerHeight - 20

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
  if (!canvas) return

  const squareSize = 100
  const centerX = (window.innerWidth - squareSize) / 2
  const centerY = (window.innerHeight - squareSize) / 2

  canvas
    .rect(squareSize, squareSize)
    .move(centerX, centerY)
    .fill('#f06')
    .stroke({ color: 'black', width: 2 })
    .radius(5)
    .draggable()
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>

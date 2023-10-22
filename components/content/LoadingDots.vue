<style>
.dot {
  animation: pulse 1.5s infinite;
}

.dot:nth-child(1) {
  animation-delay: 0.15s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.45s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
</style>

<template>
  <span>
    <span class="dot dot-1">.</span>
    <span class="dot dot-2">.</span>
    <span class="dot dot-3">.</span>
  </span>
</template>
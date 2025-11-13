<template>
  <div class="skeleton_loader" />
</template>

<style lang="scss">
.skeleton_loader {
  aspect-ratio: 1;
  border-radius: 1rem;

  background: repeating-linear-gradient(
    135deg,
    #ededed 30%,
    #dcdcdc 50%,
    #ededed 70%
  );
  background-size: 400%;
  animation: skeleton_animation 2.5s infinite linear;
}

@keyframes skeleton_animation {
  0% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% -100%;
  }
}
</style>

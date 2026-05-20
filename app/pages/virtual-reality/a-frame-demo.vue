<script setup>
import { useHead } from '#imports';

useHead({
  title: 'A-Frame VR Lab | Under Construction',
  meta: [
    {
      name: 'description',
      content:
        'Virtual Reality lab experiments using A-Frame are currently under construction.'
    }
  ]
});
</script>

<template>
  <div class="a_frame_demo_page">
    <div class="a_frame_demo_page-container">
      <div class="a_frame_demo_page-icon_wrapper">
        <div class="a_frame_demo_page-cube">
          <div
            class="a_frame_demo_page-cube_face a_frame_demo_page-cube_face-front"
          ></div>
          <div
            class="a_frame_demo_page-cube_face a_frame_demo_page-cube_face-back"
          ></div>
          <div
            class="a_frame_demo_page-cube_face a_frame_demo_page-cube_face-right"
          ></div>
          <div
            class="a_frame_demo_page-cube_face a_frame_demo_page-cube_face-left"
          ></div>
          <div
            class="a_frame_demo_page-cube_face a_frame_demo_page-cube_face-top"
          ></div>
          <div
            class="a_frame_demo_page-cube_face a_frame_demo_page-cube_face-bottom"
          ></div>
        </div>
      </div>
      <h1 class="a_frame_demo_page-title">Virtual Reality Lab</h1>
      <p class="a_frame_demo_page-subtitle">A-Frame 頁面建置中</p>
      <div class="a_frame_demo_page-divider"></div>

      <NuxtLink class="a_frame_demo_page-back_btn" to="/"> 返回首頁 </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a_frame_demo_page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: #fff;
  overflow: hidden;

  // grid background
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
    perspective: 1000px;
    transform: perspective(500px) rotateX(60deg) translateY(-100px)
      translateZ(-200px);
    animation: gridMove 20s linear infinite;
  }

  &-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    width: 100%;
    padding: 60px 40px;
    text-align: center;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
    animation: float 6s ease-in-out infinite;
  }

  &-icon_wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    margin-bottom: 32px;
    perspective: 800px;
  }

  &-cube {
    position: relative;
    width: 60px;
    height: 60px;
    transform-style: preserve-3d;
    animation: rotateCube 8s linear infinite;

    &_face {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 2px solid rgba(99, 102, 241, 0.8);
      background: rgba(99, 102, 241, 0.2);
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.5) inset;

      &-front {
        transform: translateZ(30px);
      }
      &-back {
        transform: rotateY(180deg) translateZ(30px);
      }
      &-right {
        transform: rotateY(90deg) translateZ(30px);
      }
      &-left {
        transform: rotateY(-90deg) translateZ(30px);
      }
      &-top {
        transform: rotateX(90deg) translateZ(30px);
      }
      &-bottom {
        transform: rotateX(-90deg) translateZ(30px);
      }
    }
  }

  &-title {
    margin: 0 0 8px;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 1px;
    background: linear-gradient(to right, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &-subtitle {
    margin: 0 0 24px;
    font-size: 20px;
    font-weight: 500;
    color: #cbd5e1;
  }

  &-divider {
    width: 60px;
    height: 4px;
    margin: 0 auto 24px;
    background: linear-gradient(to right, #6366f1, #a855f7);
    border-radius: 2px;
  }

  &-back_btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 999px;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
    }
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes rotateCube {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 40px;
  }
}
</style>

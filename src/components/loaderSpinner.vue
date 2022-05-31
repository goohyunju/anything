<template>
  <div 
    class="loader-component"
    :class="{
      'loader--fixed': fixed,
      'loader--absolute': absolute,
    }"
  >
    <div 
      v-if="background"
      class="loader__background"
      :class="{
        'background--blur': blur,
      }"
      :style="{
        backgroundColor: backgroundColor,
        opacity: backgroundOpacity * 0.01,
      }"
    ></div>
    <svg 
      class="circle" 
      xmlns="http://www.w3.org/2000/svg"
      :style="{
        width: spinnerSize + 'px',
        height: spinnerSize + 'px',
      }"
    >
      <circle 
        :cx="spinnerSize / 2" 
        :cy="spinnerSize / 2" 
        :r="(spinnerSize - spinnerWidth) / 2" 
        :style="{
          width: spinnerSize + 'px',
          height: spinnerSize + 'px',
          stroke: spinnerColor,
          strokeWidth: spinnerWidth + 'px',
        }"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "loaderSpinner",
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },    
    blur: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean || String,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    backgroundOpacity: {
      type: Number,
      default: 30,
    },
    spinnerColor: {
      type: String,
      default: "#FF7700",
    },
    spinnerSize: {
      type: Number,
      default: 40,
    },
    spinnerWidth: {
      type: Number,
      default: 5,
    },
  },
}
</script>

<style lang="scss" scoped>

  .loader-component {
    width: 100%;
    min-height: 300px;
    height: 100%;
    top: 0;
    left: 0;
    position: relative;
    z-index: 9;

    &.loader--fixed {
      position: fixed;
    }
    &.loader--absolute {
      position: absolute;
    }
  }

  .loader__background {
    width: 100%;
    height: 100%;

    &.background--blur {
      backdrop-filter: blur(16px);
    }
  }

  .circle {
    fill: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    circle {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 500;
      stroke-dashoffset: 500;
      transform-origin: center center;

      animation: progressBar 1.5s ease-in-out infinite, 
                progressRotate 1.2s linear infinite;

      @keyframes progressBar {
        0% {
          stroke-dashoffset: 500;
        }
        100% {
          stroke-dashoffset: -200;
        }
      }
      @keyframes progressRotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }

</style>
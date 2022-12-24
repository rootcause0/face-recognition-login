<template>
  <main class="flex h-screen items-center justify-center p-5">
    <div v-show="isCameraOpen && isLoading" class="camera-loading">
      <ul class="loader-circle">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <Transition>
      <div v-if="isCameraOpen" class="camera-box">
        <div v-show="isCameraOpen" class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-gray-700 bg-opacity-50
          ">
          <div class="flex flex-col items-center justify-center p-6 bg-white rounded-md shadow-xl">
            <div class="flex items-center justify-between">
              <h3 class="text-2xl pr-4">Please align yourself with your camera</h3>
              <button type="button" @click="toggleCamera">
                <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div v-show="isLoading" class="right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div
                class="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-full w-full">
              </div>
            </div>
            <video v-show="!isLoading" id="camera" ref="camera" :width="450" :height="337.5" autoplay></video>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>
<script>
export default {
  props: ['isCameraOpen'],

  data() {
    return {
      isCameraOpen: this.isCameraOpen,
      isShotPhoto: false,
      isLoading: false,
      link: '#'
    }
  },
  watch: {
    isCameraOpen: function (newVal, oldVal) {
      this.isCameraOpen = newVal
      this.createCameraElement()
    }
  },
  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true
      });


      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch(error => {
          this.isLoading = false;
          alert("May the browser didn't support or there is some errors.");
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    },
  },
}

</script>
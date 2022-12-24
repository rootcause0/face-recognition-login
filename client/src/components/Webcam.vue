<template>
  <main class="flex h-screen items-center justify-center p-5">
    <div v-show="isCameraOpen && isLoading" class="camera-loading">
      <ul class="loader-circle">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <div v-if="isCameraOpen" class="camera-box">

      <video id="camera" ref="camera" :width="450" :height="337.5" autoplay></video>

    </div>
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
      this.isCameraOpen = true
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
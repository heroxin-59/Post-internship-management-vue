<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'HeroxinGit',
  data() {
    return {
      url: 'https://github.com/heroxin-59/Post-internship-management-vue'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
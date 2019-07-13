<template lang="pug">
  html(lang='en')
    head
      title= title
      meta(charset='utf-8')
      meta(name='viewport', content='width=device-width, initial-scale=1')
      link(rel='stylesheet', type="text/css", href='/main.css')
    body
      <Header/>
      div(class='container-fluid')
        <slot></slot>
</template>

<script>
  const Header = require('./Header.vue');
  module.exports = {
    components: {
      Header
    }
  }
</script>
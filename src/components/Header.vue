<template lang="pug">
div(class='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm')
  a(href='/', class='my-0 mr-md-auto')
    img(src='/images/anon_logo.jpg', alt='anon Logo', class='img-fluid', width='160', height='59')
  nav(class='my-2 my-md-0 mr-md-3')
    a(href='/', class='p-2 text-dark') Home
    a(href='/privacy', class='p-2 text-dark') Privacy Policy
</template>

<script>
  module.exports = {
    data: function() {
      return {
      }
    }
  }
</script>

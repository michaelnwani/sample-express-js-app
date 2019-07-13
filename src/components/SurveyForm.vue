<template lang="pug">
  include ../views/layout.pug
  block content
    div(class='row')
      nav(class='col-md-2 d-none d-md-block bg-light sidebar')
        div(class='sidebar-sticky')
          ul(class='nav flex-column')
            li(class='nav-item') Survey
            li(class='nav-item') Questions
            li(class='nav-item') Reward
</template>

<script>
  module.exports = {
  }
</script>
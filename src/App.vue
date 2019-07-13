<template lang="pug">
  div
    <Question/>
</template>

<script>
const Question = require('./components/Question.vue');

module.exports = {
    // data: function () {
    //     return {
    //         title: '',
    //         users: [
    //             {firstname: 'Sebastian', lastname: 'Eschweiler'},
    //             {firstname: 'Bill', lastname: 'Smith'},
    //             {firstname: 'John', lastname: 'Porter'}
    //         ]
    //     }
    // }
    components: {
        Question
    }
}
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {padding: 0;margin: 0;}
html, body {height: 100%;}
a {text-decoration: none;}
li {list-style: none;}
i, b {font-weight: normal;font-style: normal;}
#app {
  height: 100%;
  background: #F4F8F9;
}
</style>

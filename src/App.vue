<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap');
* {
  font-family: 'Rubik', sans-serif;
}

  @media (min-width: 576px) {
    html, body {
    max-width: 100%;
    overflow-y: hidden;
    }
  }
#app {
  /* font-family: 'Rubik', sans-serif; */
  /* font-family: Avenir, Helvetica, Arial, sans-serif;  */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #FAFAFA;;
  height: 100vh;
}
</style>

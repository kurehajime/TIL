<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js Apple!"/>
    <p v-if="msg0.length > 0">
      {{msg0}}
    </p>
    <p v-else>
      no text
    </p>
    <input type="text" v-model="msg0">
    <button @click="clear()">clear</button>
    <Test/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Test
  },
  data () {
    return {
      msg0: 'Hello World!'
    }
  }
  ,methods: {
    clear () {
      this.msg0 = ''
    }
  },
  created () {
    fetch('http://www.geonames.org/postalCodeLookupJSON?postalcode=10504&country=US')
    .then( response => {
      return response.json()
    })
    .then( json => {
      this.msg0 = json.postalcodes[0].adminName1
    })
    .catch( () => {
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

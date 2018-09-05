<template>
  <div>
  	<pg-header></pg-header>
    <router-view></router-view>
    <pg-footer></pg-footer>
  </div>
</template>
<script>
	import index from './index.js'
	export default {
		...index
	}
</script>


<style>

</style>

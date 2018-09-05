export default {
    data() {
        return {
        	shopDetail: {}
        }
    },
    mounted() {
    	console.log(this.$route.query)
    	this.shopDetail = this.$route.query
    }

}
export default {
    data() {
        return {
            list: [
                {
                    id: 'wuxin01',
                    name: '高级瓷砖001',
                    price: '1001'
                },
                {
                    id: 'wuxin02',
                    name: '高级瓷砖002',
                    price: '1002'
                },
                {
                    id: 'wuxin03',
                    name: '高级瓷砖003',
                    price: '1003'
                },
                {
                    id: 'wuxin04',
                    name: '高级瓷砖004',
                    price: '1004'
                },
                {
                    id: 'wuxin01',
                    name: '高级瓷砖001',
                    price: '1001'
                },
                {
                    id: 'wuxin01',
                    name: '高级瓷砖001',
                    price: '1001'
                },
            ]
        };
    },
    methods: {
        goDetail(item) {
            this.$router.push({
                path: '/shopDetail',
                query: {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            })
        }
    }
}
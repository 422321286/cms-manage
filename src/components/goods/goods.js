import moment from 'moment'
/* eslint-disable */

export default {
  data() {
    return {
      goodsList: [
      ],
    }
  },
  created() {
     this.getGoodsList()
  },
  methods: {
    indexMethod(index) {
      return index+1;
    },
    async getGoodsList () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: '1',
          pagesize:5
        }
      })
      console.log(res.data);
      this.goodsList = res.data.data.goods
   }
  },
  filters: {
    filterdate (res) {
      return moment(res).format("YYYY-MM-DD hh:mm:ss")
    }
  }

};

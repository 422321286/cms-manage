
/* eslint-disable*/
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
   data() {
     return {
       activeStep: 1,

       // 控制标签页
       activeName: 'one',
       // 表单信息
       goodsAddForm: {
         goods_name: '',
         goods_price: '',
         goods_weight: '',
         goods_number: '',
         goods_cat: [],
         goods_isPromotion: false,
         //上传的图片的路径
         pics: [],

       },
       defaultProps: {
         label: 'cat_name',
         value: 'cat_id'
       },
       options: [
         {
           value: 'ziyuan',
           label: '资源',
           children: [
             {
               value: 'axure',
               label: 'Axure Components'
             },
             {
               value: 'sketch',
               label: 'Sketch Templates'
             },
             {
               value: 'jiaohu',
               label: '组件交互文档'
             }
           ]
         }
       ],
       //上传图片的部分
       dialogImageUrl: '',
       dialogVisible: false,
       //请求头
       headers: {
         Authorization: localStorage.getItem('token')
       },
       //富文本配置
       editorOption: {
         placeholder:'哈哈'
       }
     }
  },
  created() {
    this.loadCatList()
  },
  methods: {
   // 点击了标签页
   clickTabs(el) {
    console.log(el.index)
    this.activeStep = +el.index + 1
  },
    // 下一步
    next(name, index) {
      this.activeName = name
      this.activeStep = index
    },
       // 获取所有的分类
       async loadCatList() {
        let res = await this.$axios.get('categories', {
          params: {
            type: 3
          }
        })
        console.log(res.data.data)
        this.options = res.data.data
    },
       //删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  // 上传成功照片回调；
    uploadSuccess (res) {
      console.log(res.data.tmp_path);
      //上传的pic 要求是对象
      this.goodsAddForm.pics.push({
        pic:res.data.tmp_path
      })

    },
     // 添加商品
     async addGoods() {
      const {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat,
        goods_isPromotion,
        pics,
        goods_introduce
      } = this.goodsAddForm

      let res = await this.$axios.post('goods', {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat :  goods_cat.join(',')  ,
        goods_isPromotion,
        pics,
        goods_introduce
      })
      console.log(res);
      if (res.data.meta.status === 201) {

        this.$message({
          message: '添加商品成功',
          type : 'success'
        })

        this.$router.push('/goods')

      }

    }
  },
}

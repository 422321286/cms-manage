/* eslint-disable */
export default {
  data() {
    return {
      rolesList: [
        {
        roleName: '好滋好味鸡蛋仔',
        roleDesc:'a'
        }
      ],
      // 弹框是否显示
       // 是否显示分配权限对话框
       dialogAssignRightsVisible: false,
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        // 显示结构 children
        children: 'children',
        // 显示名称
        label: 'authName'
      },
      //角色id 修改数据的时候会需要
      roleId:0

    }
  },
  created () {
    this.loadRolesList()
    this.loadRightList()
  },
  methods: {
    indexMethod(index) {
      return index;
    },
    // 加载角色信息
  async loadRolesList () {
    let res = await this.$axios.get('roles')
    // console.log(res);
      this.rolesList = res.data.data
    },
  //加载权限数据
    async loadRightList () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res.data.data);
      this.data2 = res.data.data

    },
  //显示分配权限 的对话框， 拿到角色的id
  showAssignRightsDialog ( row) {
    this.roleId = row.id
    // 展示对话框
    this.dialogAssignRightsVisible = true
    // 2. 显示已经拥有的权限，  dom 异步更新
      //  nextTick dom 更新完毕自动调用回调
        //获取当前角色的第三层的id
    let keys = []
    row.children.forEach(item1 => {
      item1.children.forEach(item2 => {
        item2.children.forEach(item3 => {
          keys.push(item3.id)
        })
      })
    });

    //渲染dom
    this.$nextTick(() => {
      this.$refs.tree.setCheckedKeys(keys)
    })
    },
  //发送请求， 分配权限； 角色授权
    async startAssignRights () {
      //rids 所有的权限 id
      //ban选的 以及的 全选的
      let keys1 = this.$refs.tree.getHalfCheckedKeys();
      let keys2 = this.$refs.tree.getCheckedKeys()
      let keys = [...keys1, ...keys2]

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids:keys.join(',')
      })
      console.log(res);
      console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignRightsVisible = false

        // 刷新列表
        this.loadRolesList()

        // 提示更新成功
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 800
        })
      }
    }
  }
}

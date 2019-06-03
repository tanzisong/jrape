<template>
  <div>
    <el-menu
      active-text-color="#38baaa"
      router>
      <template v-for="(menu, index) in crumblist">
        <el-menu-item
          :index="menu.name"
          :route="{name:menu.name}"
          :key="index">
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      crumblist: []
    }
  },
  mounted () {
    this.crumblist = this.$store.state.menu[0].children.filter(item => {
      return !item.hidden
    })
  }
}
</script>

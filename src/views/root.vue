<template>
  <div class="root">
    <div class="left">
      <Sidebar></Sidebar>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'root',
  components: {
    Sidebar
  }
}
</script>

<style scoped lang="scss">
  .left{
    position: absolute;
    width: 150px;
    left: 0;
  }
  .right {
    position: absolute;
    left: 150px;
    overflow: auto;
    width: 100%;
    padding: 30px 0;
  }
</style>

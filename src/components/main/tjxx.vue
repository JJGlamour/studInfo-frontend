<template>
<div>
    <div v-for="(item,index) in tjxx" :key="index">{{ item }}<el-divider></el-divider></div>
</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
        tjxx: {
            type: Array,
            default: function(){
                return [];
            }
        }
    }
  }
</script>
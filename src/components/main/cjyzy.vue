<template>
<div>
    <div v-for="(item,index) in cjyzy" :key="index">{{ item }}<el-divider></el-divider></div>
</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
        cjyzy: {
            type: Array,
            default: function(){
                return [];
            }
        }
    }
  }
</script>
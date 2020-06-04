<template>
<div>
    <div v-for="(item,index) in bmxx" :key="index">{{ item["ch"] }}：{{ item['value'] }}<el-divider></el-divider></div>
</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
        bmxx: {
            type: Array,
            default: function(){
                return [];
            }
        }
    }
  }
</script>
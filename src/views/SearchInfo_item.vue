<template>
  <div class="Searchinfo_item" v-if="show">
    
      <slot/>
  </div>
</template>

<script>
export default {
 props:{
    id:String,
    title:String
  },
  data(){
    return{
      show:false
    }
  }
}
</script>

<style>

</style>
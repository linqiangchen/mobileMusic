<template>
  <div id="SearchInfo">
      <div class="title">
          <div
           v-for="item in navtitle" :key="item.id"
           :class="{active:selectNow===item.select}"
           @click="clickAction(item)"
           
           >{{item.title}}</div>
         
      </div>
      <slot/>
  </div>
</template>

<script>

export default {
  props:{
    value:String
  },
 data(){
   return{
     
       navtitle:[],
        selectNow:0
   }
 },
 methods:{
   
   clickAction(item){
     this.selectNow=item.select;
     this.$emit('input',item.id)
   },
  
   findNowitem(){
     // 查找需要显示的content
      this.$children.forEach((item) => {
        if (item.id === this.value) {
          //显示content的内容
          item.show = true;
        } else {
          //隐藏content的内容
          item.show = false;
        }
      });
   }
 },
 mounted(){
    this.navtitle = this.$children.map((item,index) => ({
      title: item.title,
      id: item.id,
      select:index
    }));
    this.findNowitem()
 },
 watch:{
   value(){
     this.findNowitem()
   }
 }
  
}
</script>

<style lang="scss" scoped>
    #SearchInfo{
        font-size: 42px;
    }
    .title{
      width: 100%;
      height: 110px;
      line-height: 110px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
        div{
            width: 90px;
            border-bottom: 5px solid transparent;
            
        }
        .active{
              border-bottom: 5px solid #ff3c34;
              color:#ff3c34;
            }
    }
  
</style>


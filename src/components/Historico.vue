<template>
  <v-container>
    <v-layout
      wrap
    >
        <v-flex xs12 text-xs-center mb-3>
            <h2>{{title}}</h2>
        </v-flex>
        <v-flex xs12 text-xs-center>
          
          <v-list dense
            v-for="item in items"
            v-bind:key="item"
          >
            <v-card>
              <v-list-tile text-xs-center>
                <h3>{{item}}</h3>
                <div class="close--right" @click="removeStorage(item)">x</div>
              </v-list-tile>
            </v-card>
          </v-list>  
          
          
        </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  
  export default {
    data: () => { 
      return {
        title: "Historico",
        items: []
      }
    },
    methods:{
      removeStorage(e){
        for(let i = 0; i < localStorage.length-1; i++){
          if(this.items[i]==e){
            localStorage.removeItem(i);
            this.items.splice(i, 1);
          }
        }
        
      }
    },
    created() {
      for(let i = 0; i < localStorage.length-1; i++){
        this.items.push(localStorage[i]);
      }
    }
  }
</script>

<style>
  .close--right{
    position: absolute;
    top:5px;
    right: 0px;
    padding: 5px;
    cursor: pointer;
  }
</style>

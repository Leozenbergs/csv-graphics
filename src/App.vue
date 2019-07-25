<template>
  <v-app>
    
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="height: 100%;"
    >
      <!-- <div class="pointer fr close-btn pt-5 pr-10 pb-5 pl-10 relative"
        @click.stop="drawer = !drawer"
        width="100%"
        d-inline-block
      >
        X
      </div> -->
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title d-inline-block>
              Csv Uploader
            </v-list-tile-title>
            
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <router-link to='/'>
          <v-list-tile class="list--item"
          >
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <router-link to='/historico'>
          <v-list-tile class="list--item">
            <v-list-tile-action>
              <v-icon>question_answer</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                Historico
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        </v-list>
    </v-navigation-drawer>
  

    
    <v-content>
      <v-layout justify-left>
        
        <v-toolbar-side-icon
          ma-3
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>         
      </v-layout>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      
      drawer: null
    }
  }
}
</script>

<style>
  .pointer{cursor: pointer}
  .fr{float:right}
  .pt-5{padding-top: 5px !important}
  .pr-10{padding-right: 10px !important}
  .pb-5{padding-bottom: 5px !important}
  .pl-10{padding-left: 10px !important}
  .relative{position: relative}
  .close-btn{color: #eb4034}
  .close-btn:hover{
    background: #eb4034;
    color: #fff;
  }
  a {
    text-decoration: none;
    color: #333 !important;
  }
  .list--item:hover{
    background: #dcdcdc;
  }
</style>

<template>
  <v-container>
    <v-layout
      wrap
    >
        <v-flex xs12 text-xs-center mb-3>
            <h2>{{title}}</h2>
            <hr class="title-line"> 
        </v-flex>

        <v-flex xs12>
          <form style="margin: auto 0; display: block;">
            <v-flex offset-xs4 xs4>
              <v-select
                :items="items"
                filled
                label="Selecionar empresa pelo nome"
                @change="selectCompany"
              ></v-select>
            </v-flex>
          </form>
        </v-flex>
        <v-flex xs12 v-if="acoes != null">
          <v-data-table
            :headers="headers"
            :items="acoes"
            :sort-by="['data']"
            :sort-desc="[false]"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:items="props">

              <td class="text-xs-left">{{ props.item.evento }}</td>
              <td class="text-xs-left">{{ props.item.acao }}</td>
              <td class="text-xs-left">{{ props.item.data }}</td>

            </template>
          </v-data-table>
        </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  
  export default {
    data: () => { 
      return {
        title: "Ultimas Ações",
        headers: [
          {
            text: 'Evento',
            align: 'left',
            sortable: false,
            value: 'evento',
          },
          { text: 'Ação', value: 'acao' },
          { text: 'Data', value: 'data' }
        ],
        items: [],
        acoes: null
      }
    },
    computed: {
      getById(){
        return this.$store.getters.compId;
      }
    },
    methods: {
      selectCompany(e){
        this.acoes = [];
        this.$store.state.data.filter((each) => {
          if(each.company_info[0].company_name == e){
            
            this.acoes.push({evento: each.event_name, acao: each.action, data: each.date_time});
          }        
        });
      }
    },
    async created(){
      await this.$store.dispatch('setData');

      this.$store.state.data.filter((each) => {
        if(!this.items.includes(each.company_id)){
          this.items.push(each.company_info[0].company_name)
        }        
      });
    }
  }
</script>

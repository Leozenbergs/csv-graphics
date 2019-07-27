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
        <v-data-table
          :headers="headers"
          :items="items"
          multi-sort
          class="elevation-1"
        >
          <template v-slot:items="props">

            <td class="text-xs-left">{{ props.item.nome }}</td>
            <td class="text-xs-left">{{ props.item.funcionario }}</td>
            <td class="text-xs-left">{{ props.item.empresa }}</td>
            <td class="text-xs-left">{{ props.item.frequencia }}</td>

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
        title: "Mais acessados",
        events: [],
        eventList: [],
        logCont: 0,
        budCont: 0,
        dashCont: 0,
        first: [],
        second: [],
        headers: [
          {
            text: 'Nome',
            align: 'left',
            sortable: false,
            value: 'nome',
          },
          { text: 'Funcionário', value: 'funcionario' },
          { text: 'Empresa', value: 'empresa' },
          { text: 'Frequencia', value: 'frequencia' }
        ],
        items: []
      }
    },
    methods: {
      contEvent(array){
        let aux = [];
        array.forEach((each)=>{          
          switch(each){
            case 'login':
              this.logCont += 1;
              break;
            case 'budget':
              this.budCont += 1;
              break;
            case 'dashboard':
              this.dashCont += 1;
              break;
          }
        });
        let maxName = (Math.max(this.logCont, this.budCont, this.dashCont) == this.logCont)?'login':(Math.max(this.logCont, this.budCont, this.dashCont) == this.budCont)?'budget': (Math.max(this.logCont, this.budCont, this.dashCont) == this.dashCont)?'dashboard': null;
        let max = [Math.max(this.logCont, this.budCont, this.dashCont), maxName];
        this.first = max;
        let maxCont = Math.max(this.logCont, this.budCont, this.dashCont);
        switch(maxCont){
          case this.logCont:            
            (this.budCont > this.dashCont)? this.second = [this.budCont, 'budget']: this.second = [this.dashCont, 'dashboard'];
            break;
          case this.budCont:
            (this.logCont > this.dashCont)? this.second = [this.logCont, 'login']: this.second = [this.dashCont, 'dashboard'];
            break;
          case this.dashCont:
            (this.logCont > this.budCont)? this.second = [this.logCont, 'login']: this.second = [this.budCont, 'budget'];
            break;
        }

      },
      loadDestaque(e){
        let cont = 0;
        this.$store.state.data.filter((each) => {
          if(each.event_name == e[1] && cont == 0 ){ //             
            this.items.push({nome: each.event_name, funcionario: each.user[0].name, empresa: each.company_info[0].company_name, frequencia: e[0]});
            cont += 1;
          }
        });
        
      }
    },
    computed: {
      getById(){
        return this.$store.getters.compId;
      }
    },
    async created() {
      await this.$store.dispatch('setData');

      this.$store.state.data.filter((each) => {
        
        this.events.push(each.event_name);
              
      });
      // console.log(this.events);
      this.contEvent(this.events);
      this.loadDestaque(this.first);
      this.loadDestaque(this.second);
    }
  }
</script>

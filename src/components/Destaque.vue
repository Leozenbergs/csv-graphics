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

            <td class="text-xs-left">{{ props.item.funcionario }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.empresa }}</td>

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
        title: "Usuário destaque",
        users: [],
        user: null,
        headers: [
          {
            text: 'Funcionário',
            align: 'left',
            sortable: false,
            value: 'funcionario',
          },
          { text: 'Email', value: 'email' },
          { text: 'Empresa', value: 'empresa' }
        ],
        items: []
      }
    },
    methods: {
      contUser(array){
      
        if(array.length == 0)
          return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;

      },
      loadDestaque(e){
        let cont = 0;
        this.$store.state.data.filter((each) => {
          if(each.user_id == e && cont == 0){            
            this.items.push({funcionario: each.user[0].name, email: each.user[0].email, empresa: each.company_info[0].company_name});
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
        
        this.users.push(each.user_id);
              
      });
      this.user = this.contUser(this.users);
      this.loadDestaque(this.user);
    }
  }
</script>

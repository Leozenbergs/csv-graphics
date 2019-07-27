<template>
  <v-container>
    <v-layout
      text-xs-left
      wrap
    >
      <v-flex xs8 offset-xs2>
         <!-- Chart.js -->
         <div class="canvas">
          <canvas id="myChart"></canvas>
         </div>
        
      </v-flex>
      <v-flex xs12 text-xs-center mt-4 mb-4>
       

        <h2>Importar csv</h2> 
        <form enctype="multipart/form-data">
          <v-flex xs12 text-xs-center mb-2>            
            <v-btn color="blue" class="white--text" @click.native="openFileDialog" prepend-icon='attach_file'>
              Escolher arquivo
            </v-btn>
          </v-flex>
					<input type="file" id="file-upload" @change="showFile" style="display:none" accept=".csv" required>
          <div id="file"></div>
          <v-flex xs12 mt-2 text-xs-center>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              @click="createPost" 
              v-if="this.aux == 1"
            >
              Fazer Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
          
        </form>        
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import Requests from '../requests';
  
  
  export default {
    data: () => { 
      return {
        aux: 0,
        histCont: 0,
        gets: [],
        puts: [],
        posts: [],
        dels: []
        
      }
    },

    methods: {
      openFileDialog() {
        document.getElementById('file-upload').click();
      },
      showFile(){        
        let text = document.getElementById('file-upload').value;
        document.getElementById('file').innerHTML=text;
        this.aux = 1;
      },
      createPost(){        
        let input = document.getElementById('file-upload');
        Requests.insertPost(input.files[0]);
        localStorage.setItem(localStorage.length-1, input.files[0].name);
        this.$nextTick(() => {
            console.log('re-render start')
            this.chartData();
            this.$nextTick(() => {
                console.log('re-render end');                
            })
        });
        this.aux = 0;
      
      },
      loadChart(){
        let ctx = document.getElementById('myChart').getContext('2d');

        let getInfo = {
          label: 'Get',
          data: this.gets,
          backgroundColor: '#2b6cee',
          borderWidth: 0,
          yAxisID: "y-axis-density"
        };

        let putInfo = {
          label: 'Put',
          data: this.puts,
          backgroundColor: '#2bee4e',
          borderWidth: 0,
          yAxisID: "y-axis-density"
        };

        let postInfo = {
          label: 'Post',
          data: this.posts,
          backgroundColor: '#ee932b',
          borderWidth: 0,
          yAxisID: "y-axis-density"
        };

        let delInfo = {
          label: 'Delete',
          data: this.dels,
          backgroundColor: '#ddd',
          borderWidth: 0,
          yAxisID: "y-axis-density"
        };

        let chartInfo = {
          labels: ["Empresa1", "Empresa2", "Empresa3"],
          datasets: [getInfo, putInfo, postInfo, delInfo]
        };

        let chartOptions = {
          scales: {
            xAxes: [{
              barPercentage: 1,
              categoryPercentage: 0.6
            }],
            yAxes: [{
              id: "y-axis-density"
            }]
          }
        };

        let barChart = new Chart(ctx, {
          type: 'bar',
          data: chartInfo,
          options: chartOptions
        });
        
      },
      async deletePost(id){
        await Requests.Post(id);
        this.posts = await Requests.getPosts();
      },
      async chartData(){
        
          
        this.posts = await Requests.getPosts();
        
        this.posts.forEach((each)=>{
          switch(each.action){
            case 'get':
              this.getVal += 1;
              break;
            case 'put':
              this.putVal += 1;
              break;
            case 'post':
              this.postVal += 1;
              break;
            case 'delete':
              this.delVal += 1;
              break;
          }
        });
        
        this.loadChart();
      },
      setChartValues(){
        let contGet1 = 0;
        let contGet2 = 0;
        let contGet3 = 0;
        let contPut1 = 0;
        let contPut2 = 0;
        let contPut3 = 0;
        let contPost1 = 0;
        let contPost2 = 0;
        let contPost3 = 0;
        let contDel1 = 0;
        let contDel2 = 0;
        let contDel3 = 0;
        this.$store.state.data.filter((each) => {
          switch(each.company_id){
            case '1':              
              (each.action == "get")? contGet1++: ((each.action == 'put')? contPut1++:((each.action == 'post')? contPost1++: ((each.action == 'delete')? contDel1++: null)));
              break;
            case '2':
              (each.action == "get")? contGet2++: ((each.action == 'put')? contPut2++:((each.action == 'post')? contPost2++: ((each.action == 'delete')? contDel2++: null)));     
              break;
            case '3':
              (each.action == "get")? contGet3++: ((each.action == 'put')? contPut3++:((each.action == 'post')? contPost3++: ((each.action == 'delete')? contDel3++: null)));                   
              break;
          }        
        });
        this.gets.push(contGet1);
        this.gets.push(contGet2);
        this.gets.push(contGet3);
        this.puts.push(contPut1);
        this.puts.push(contPut2);
        this.puts.push(contPut3);
        this.posts.push(contPost1);
        this.posts.push(contPost2);
        this.posts.push(contPost3);
        this.dels.push(contDel1);
        this.dels.push(contDel2);
        this.dels.push(contDel3);
      }
    },
    computed: {
      getById(){
        return this.$store.getters.compId;
      }
    },
    async created(){  
      await this.$store.dispatch('setData');   
      this.setChartValues();
      this.chartData();
      
    }
  }
</script>

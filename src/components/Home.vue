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
              Escoler arquivo
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
        getVal: 0,
        putVal: 0,
        postVal: 0,
        delVal: 0,
        
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
        let chart = new Chart(ctx, {
          // The type of chart we want to create
           type: 'bar',
          data: {
            labels: ['Actions'],
            datasets: [{
              label: 'Get',
              backgroundColor: "#000080",
              data: [this.getVal]
            }, {
              label: 'Put',
              backgroundColor: "#d3d3d3",
              data: [this.putVal]
            }, {
              label: 'Post',
              backgroundColor: "#add8e6",
              data: [this.postVal]
            },{
              label: 'Delete',
              backgroundColor: "#777",
              data: [this.delVal]
            }]
          },

          options: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                fontColor: "#000080",
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
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
      }
    },
    async created(){  
          
      this.chartData();
      
    }
  }
</script>

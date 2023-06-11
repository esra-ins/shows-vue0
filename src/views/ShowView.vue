<template>
    <div class="shows-list">
      <div class="top-rated-list mb-8 font-bold">
        <input class="cursor-pointer" type="button" value="TOP RATED TV-SHOWS" :bind="GetTopRatedShows()">
        <div class="w-full overflow-hidden">
          <div class="inline-flex overflow-x-scroll w-full overflow-y-hidden">
            <div class="top-rated  m-4 w-32 h-60 min-w-fit" v-for="show in topRatedShows" :key="show.id" >
              <img :src="imgBaseUrl+show.poster_path" class="max-h-40 rounded-xl"/>
              <div class="w-9 h-9 bg-black text-white text-center rounded-2xl -mt-4 pt-2 border-white relative">{{show.vote_average}}</div>
                <div class="w-min mt-1 min-w-fit">{{show.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import {ref} from 'vue';
import env from '@/env.js';

export default {
  name: 'HomeView',
  components: {
    
  },
  setup () {
    const shows = ref([]);
    const topRatedShows = ref([]);
    const imgBaseUrl = env.imgBaseUrl;
     
    const GetTopRatedShows = () => {
      const topRatedShowsUrl = `${env.baseUrl}tv/top_rated?${env.apikey}`;

      fetch(topRatedShowsUrl).then(response => response.json()).then(data => {
          topRatedShows.value=data.results;

          //console.log(topRatedShows.value);
      })
    }

    return {
      shows,
      GetTopRatedShows,
      topRatedShows,
      imgBaseUrl,
    }
  }
}
</script>

<style>
</style>

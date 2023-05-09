<template>
  <div class="mainbanner bg-cover h-[600px]">
    <div class="column_wrapper ml-8">
      <div class="content_wrapper wrap ml-8 text-white font-bold">
        <div class="title pt-8 pb-16">
          <h2 class="text-5xl pt-8">Welcome.</h2>
          <h3 class="text-4xl pt-4">Millions of movies, TV shows and people to discover. Explore now.</h3>
        </div>
        <div class="search inline-flex h-[46px] w-4/5">
          <form @submit.prevent="SearchMovies()" class="h-[46px] w-4/5 inline-flex">
            <label class="h-[46px] w-full rounded-full">
                <input class="w-full h-full rounded-full pl-2 text-black" v-model="search" placeholder="Search for a movie, tv show, person......">
            </label> 
            <input class="rounded-full bg-green w-24 h-[46px] ml-[-40px]" type="submit" value="Search"/>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="list-1">
    <div class="movie" v-for="movie in movies" :key="movie.id">
      {{movie.title}}
      {{movie.vote_average}}
      <img :src="imgBaseUrl+movie.poster_path" />
      <!-- <img :src="'${env.imgBaseUrl}'+movie.poster_path"/>  -->
      <!-- <img :src="imgUrl+'{{movie.poster_path}}'"/> -->
    </div>

    <br/>
    <hr/>

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

    <div class="popular-list font-bold mb-12">
      <input class="cursor-pointer mb-2" type="button" value="POPULAR TV-SHOWS" :bind="GetPopularShows()">
      <!--  <input class="cursor-pointer mb-2" type="button" value="POPULAR TV-SHOWS" @click="GetPopularShows()">  -->
      <div class="w-full overflow-hidden">
        <div class="inline-flex overflow-x-scroll w-full overflow-y-hidden">
          <div class="top-rated m-4 w-32 h-60 min-w-fit" v-for="show in popularShows" :key="show.id" >
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
    const search = ref("");
    const movies = ref([]);
    const topRatedShows = ref([]);
    const popularShows = ref([]);
    const imgBaseUrl = env.imgBaseUrl;
     
    const GetTopRatedShows = () => {
      const topRatedShowsUrl = `${env.baseUrl}tv/top_rated?${env.apikey}`;

      fetch(topRatedShowsUrl).then(response => response.json()).then(data => {
          topRatedShows.value=data.results;

          //console.log(topRatedShows.value);
      })
    }

    const GetPopularShows = () => {
      const popularShowsUrl = `${env.baseUrl}tv/popular?${env.apikey}`;

      fetch(popularShowsUrl).then(response => response.json()).then(data => {
          popularShows.value = data.results;

          //console.log(popularShows.value);
      })
    }

    const SearchMovies = () => {
      //
    }

    return {
      search,
      movies,
      SearchMovies,
      GetTopRatedShows,
      topRatedShows,
      imgBaseUrl,
      GetPopularShows,
      popularShows
    }
  }
}
</script>

<style>
.mainbanner {
    background-image: linear-gradient(to right, rgba(6, 57, 112, 0.8) 0%, rgba(6, 57, 112, 0) 100%), url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/4anfueQJG7PzfVain87idtuK3hl.jpg");
}
</style>

<template>
  <div class="top-rated-list mb-8 font-bold">
    <div class="w-full overflow-hidden">
      <h1 class="ml-4"> POPULAR MOVIES </h1>
      <div class="inline-flex overflow-x-scroll w-full overflow-y-hidden">
        <div class="popularmovie-list m-4 w-32 h-60 min-w-fit" v-for="movie in popularmovies" :key="movie.id">
          <div>
            <img :src="imgBaseUrl+movie.poster_path"  class="max-h-40 rounded-xl"/>
            <div class="w-9 h-9 bg-black text-white text-center rounded-2xl -mt-4 pt-2 border-white relative">{{movie.vote_average}}</div>
            <div class="w-min mt-1 min-w-fit">{{movie.title}}</div>
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
  // https://api.themoviedb.org/3/movie/popular?api_key=348088421ad3fb3a9d6e56bb6a9a8f80
  // movie/top_rated

  setup () {
    const popularmovies=ref([]);
    const imgBaseUrl= env.imgBaseUrl;

    const SearchPopularMovies = () => {
        const popularMoviesUrl=`${env.baseUrl}movie/popular?${env.apikey}`;
        console.log(popularMoviesUrl);

        fetch(popularMoviesUrl).then(response => response.json()).then(data => {
          //console.log(data);
          popularmovies.value=data.results;
        })
    }

    SearchPopularMovies();
     
    return {
      SearchPopularMovies,
      popularmovies,
      imgBaseUrl,
    }
  }
}
</script>

<style>
</style>
<template>
  <div class="mainbanner bg-cover h-[600px]">
    <div class="column_wrapper ml-8">
      <div class="content_wrapper wrap ml-8 text-white font-bold">
        <div class="title pt-8 pb-16">
          <h2 class="text-5xl pt-8">Welcome.</h2>
          <h3 class="text-4xl pt-4">Millions of movies, TV shows and people to discover. Explore now.</h3>
        </div>
        <div class="search inline-flex h-[46px] w-4/5">
          <!--  <form @submit.prevent="SearchMovies()" class="h-[46px] w-4/5 inline-flex">  -->
          <form v-on:click="ChangeVisibilityOfResults()" v-on:keydown="ChangeVisibilityOfResults()" class="h-[46px] w-4/5 inline-flex">
            <label class="h-[46px] w-full rounded-full">
                <input class="w-full h-full rounded-full pl-2 text-black" v-model="search" label="Search" placeholder="Search for a movie, tv show, person......">
                <div class="list-1 bg-white overflow-y-scroll h-[300px] hidden">
                  <div class="movie p-4 text-black" v-for="movie in movies" :key="movie.id">
                    {{movie.title}}
                    {{movie.vote_average}}
                    <!--  <img :src="imgBaseUrl+movie.poster_path" />  -->
                  </div>
                </div>
            </label> 
            <input class="rounded-full bg-green w-24 h-[46px] ml-[-40px]" type="submit" value="Search"/>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div>
    <br/>
    <hr/>

    <div class="popular-list font-bold mb-12">
      <input class="cursor-pointer mb-2" type="button" value="POPULAR TV-SHOWS">
      <!--  <input class="cursor-pointer mb-2" type="button" value="POPULAR TV-SHOWS" @click="GetPopularShows()">  -->
      <div class="w-full overflow-hidden">
        <div class="inline-flex overflow-x-scroll w-full overflow-y-hidden">
          <div class="top-rated m-4 w-32 h-60 min-w-fit" v-for="show in popularShows" :key="show.id" >
            <img :src="imgBaseUrl+show.poster_path" class="max-h-40 rounded-xl"/>

            <div class="flex">
              <div class="w-9 h-9 bg-black text-white text-center rounded-2xl -mt-4 pt-1 border border-solid border-white relative">{{show.vote_average}}</div>
              <button @click="movieStore.toggleFav(show)" :class="{active: movieStore.isFavActive(show)}"> fav </button>
            </div>

            <div class="w-min mt-1 min-w-fit">{{show.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="top-rated-list mb-8 font-bold">
      <!-- <input class="cursor-pointer" type="button" value="TOP RATED TV-SHOWS" @click="GetTopRatedShows()">  -->
      <input class="cursor-pointer" type="button" value="TOP RATED TV-SHOWS">
      <div class="w-full overflow-hidden">
        <div class="inline-flex overflow-x-scroll w-full overflow-y-hidden">
          <div class="top-rated  m-4 w-32 h-60 min-w-fit" v-for="show in topRatedShows" :key="show.id" >
            <img :src="imgBaseUrl+show.poster_path" class="max-h-40 rounded-xl"/>
            <div class="w-9 h-9 bg-black text-white text-center rounded-2xl -mt-4 pt-2 border-white relative">{{show.vote_average}}</div>
            <!-- fav button -->
            <div class="w-min mt-1 min-w-fit">{{show.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden">
      <p>favorites</p>
      <div  v-for="show in movieStore.favMovies" :key="show.id"  >
        <div>{{show.name}}</div>
      </div>
    </div>

  </div>

</template>

<script>
import {ref} from 'vue';
import env from '@/env.js';

import { watch, onBeforeUnmount } from "vue";
import debounce from "lodash.debounce";

import {useMovieStore} from '../stores/MovieStore';

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

    const filter=ref('popular');

    const movieStore = useMovieStore();

    //let awaitingSearch = false;

    movieStore.getMovies();
     
    const GetTopRatedShows = () => {
      const topRatedShowsUrl = `${env.baseUrl}tv/top_rated?${env.apikey}`;

      fetch(topRatedShowsUrl).then(response => response.json()).then(data => {
          topRatedShows.value=data.results;

          //console.log(topRatedShows.value);
      })
    }

    GetTopRatedShows();

    const GetPopularShows = () => {
      const popularShowsUrl = `${env.baseUrl}tv/popular?${env.apikey}`;

      fetch(popularShowsUrl).then(response => response.json()).then(data => {
          popularShows.value = data.results;

          //console.log(popularShows.value);
      })
    }

    GetPopularShows();

    const ChangeVisibilityOfResults = () => {
      document.querySelector('form .list-1').classList.add('hidden');
    }

    const SearchMovies = () => {
      if (search.value && search.value.length >= 3) {
        console.log(search.value);

        const searchUrl=`${env.baseUrl}search/movie?${env.apikey}&query=${search.value}`;

        console.log(searchUrl);

        fetch(searchUrl).then(response => response.json()).then(data => {
          console.log(data);

          movies.value = data.results; // array name: results

          search.value = "";

          //console.log(movies.value);
        });

        document.querySelector('form .list-1').classList.remove('hidden');
      }
    }

    const debouncedWatch = debounce(() => {
      SearchMovies();
    }, 3000);

    watch(search, debouncedWatch);

    onBeforeUnmount(() => {
      debouncedWatch.cancel();
    })

    const addToFav = (show) => {
      console.log(show.name);
    }

    return {
      search,
      movies,
      ChangeVisibilityOfResults,
      SearchMovies,
      GetTopRatedShows,
      topRatedShows,
      imgBaseUrl,
      GetPopularShows,
      popularShows,
      addToFav,
      filter,
      movieStore
    }
  },
    
}
</script>

<style>
.mainbanner {
    background-image: linear-gradient(to right, rgba(6, 57, 112, 0.8) 0%, rgba(6, 57, 112, 0) 100%), url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/4anfueQJG7PzfVain87idtuK3hl.jpg");
}


.popular-list button {
  background-color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin-top: -15px;
  margin-left: 3px;
  border: 1px solid black;
}

.popular-list button.active {
  background-color: rgb(250, 7, 169);
  border: 1px solid white;
  color: white;
}
</style>

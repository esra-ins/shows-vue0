import { defineStore } from 'pinia';
import env from '@/env.js';
import { ref } from 'vue';

export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        movies: [],
        popularShowsUrl: `${env.baseUrl}tv/popular?${env.apikey}`,
        favMovies: JSON.parse(localStorage.getItem('favorite-movies')) || [],
        isFav: false,
    }),
    actions: {
        async getMovies () {
            const res = await fetch(this.popularShowsUrl);
            const data = await res.json();

            this.movies = data.results;
            // console.log("this.movies  = ", this.movies)
        },
        isFavActive (movie) {
            function convertJsonToArray (json) {
                var result = [];
                var keys = Object.keys(json);

                keys.forEach((key) => {
                    result.push(json[key]);
                });

                return result;
            }

            const favMoviesObject = convertJsonToArray(JSON.parse(JSON.stringify(this.favMovies)))
            //const favMoviesObject = Object.entries(JSON.parse(JSON.stringify(this.favMovies)))

            return Object.values(favMoviesObject).some((item) => {
                return item.id === movie.id;
            });
        },
        toggleFav (movie) {
            const isFavorite = ref(Boolean);
            isFavorite.value = this.favMovies.includes(movie);

            if (isFavorite.value) {
                this.favMovies= this.favMovies.filter(m=>m.id!==movie.id);

                isFavorite.value=false;
                //console.log("if içinde ",isFavorite.value);
            } else {
                this.favMovies.push(movie);

                isFavorite.value = true;
                // console.log("else içinde",isFavorite.value);
            }

            this.isFav = isFavorite.value;

            const favoritesObject = JSON.parse(JSON.stringify(this.favMovies));

            localStorage.setItem('favorite-movies', JSON.stringify(favoritesObject));

            // console.log("list2 = ", this.favMovies)
            // console.log('------0');
            // console.log(typeof favoritesObject);
            // console.log(JSON.stringify(favoritesObject))
            // console.log(JSON.parse(localStorage.getItem('favorite-movies')));
        }
    }
})

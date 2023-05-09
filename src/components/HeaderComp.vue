<template>
  <div class="wrapper">
    
    <!-- <div class="text-green underline mr-8">StartPage2222222</div>  -->
    <div class="content font-bold bg-dark-blue content-center grid">
      <div class="sub_media m-8 mt-4 mb-4">
        <div class="nav_wrapper flex mr-[10px] ml-8">
            <a class="logo" href="/">
              <div class="logo inline-flex mr-20 content-center text-2xl">
                <div class="inline text-green mr-4">
                  <router-link to="/"> T M D B </router-link>
                </div>
                <div class="rounded-full bg-green w-16 h-5 mt-1"></div>
            </div>
            </a>

          <div class="mt-1 flex" data-role="menu" tabindex="0" role="menubar">
            <nav class="flex">
              <div class="hidden mr-8 text-white">
                <router-link to="/"> Home </router-link>
              </div>

              <div class="mr-8 text-white">
                <router-link to="/movie"> Movies </router-link>
                <!-- <router-link to="/top-rated"> top rated movies </router-link> -->
              </div>

              <div class="mr-8 text-white">
                <router-link to="/show">TV Shows </router-link>
              </div>
            </nav>
            <!-- <router-view/> -->
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
</script>

<style>

</style>
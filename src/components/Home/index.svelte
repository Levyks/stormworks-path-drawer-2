<script lang="ts">

  import { onMount } from 'svelte';

  import { Map, getMaps } from '../../helpers/maps';

  import MapCard from './MapCard.svelte';
  import MapCardPlaceholder from './MapCardPlaceholder.svelte';
  import NewMapModal from './NewMapModal.svelte';

  const MAPS_PER_PAGE = 6;

  let current_page = 0;
  let number_of_pages: number;
  
  let maps: Map[] = [];
  let maps_current_page: Map[] = [];

  let isNewMapModalOpen: boolean = false;

  onMount(reloadMaps);

  $: number_of_pages = Math.ceil(maps.length / MAPS_PER_PAGE);
  $: maps_current_page = maps.slice(current_page * MAPS_PER_PAGE, (current_page + 1) * MAPS_PER_PAGE);

  function createNewMap() {
    isNewMapModalOpen = true;
  }

  async function reloadMaps() {
    maps = Object.values(await getMaps());
  }

</script>

<main>
  <h1>Choose a map image:</h1>
  
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="grid">
      {#each maps_current_page as map}
        <MapCard {map} on:mapDeleted={reloadMaps} />
      {/each}
      {#each {length: MAPS_PER_PAGE - maps_current_page.length} as _}
        <MapCardPlaceholder on:click={createNewMap}/>
      {/each}
    </div>
    <button class="btn btn-primary mt-3" on:click={createNewMap}>Add a new one</button>
  </div>

  <div class="d-flex">
    
    <button 
      class="btn btn-primary mx-2"
      on:click={() => current_page--}
      disabled={current_page === 0}
    >
      &laquo;
    </button>

    <button 
      class="btn btn-primary mx-2"
      on:click={() => current_page++}
      disabled={current_page === number_of_pages - 1}
    >
      &raquo;
    </button>

  </div>
  
</main>

<NewMapModal bind:isOpen={isNewMapModalOpen} on:mapAdded={reloadMaps}/>

<style lang="scss">

  main {
    padding: 20px;
    background-color: #eaeaea;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 20px;
  }
  
</style>
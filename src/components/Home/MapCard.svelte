<script lang="ts">

  import { createEventDispatcher } from 'svelte';

  import type { Map } from '../../helpers/maps';
  import { deleteMap } from '../../helpers/maps';
  import { confirm } from 'promise-bs-dialogs';

  export let map: Map;

  const dispatch = createEventDispatcher();

  function handleDelete() {
    
    confirm({
      title: 'Delete map',
      message: `Are you sure you want to delete the map "${map.name}"? This can't be undone`,
      confirmText: 'Delete',
      confirmClass: 'btn-danger',
    }).then(async result => {
      if(result) {
        await deleteMap(map)
        dispatch('mapDeleted');
      }
    });
  }

</script>

<div class="card">
  <img src={map.imgSrc} class="card-img-top" alt="Map"/>
  <div class="card-body">
    <h4 class="card-title m-0">{map.name}</h4>
  </div>
  {#if map.added_by_user}
    <button type="button" class="btn-close" on:click={handleDelete}></button>   
  {/if}
</div>

<style lang="scss">

  .card {
    display: relative;
    max-width: 400px;

    cursor: pointer;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .25s transform ease, .25s box-shadow ease;

    
    .btn-close {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      
      &:hover {
        background-color: red;
        border-radius: 50%;
      }

      &:focus {
        box-shadow: none;
      }
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);

      .btn-close {
        display: block;
      }
    }

  }


  img {
    object-fit: contain;
    background-color: #bababa;
    height: 8rem;
  }
  
</style>
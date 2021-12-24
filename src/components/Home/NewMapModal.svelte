<script lang="ts">

  import * as dialog from '@tauri-apps/api/dialog';
  import { convertFileSrc } from '@tauri-apps/api/tauri';
  import Modal from "sv-bootstrap-modal";
  import { createEventDispatcher } from 'svelte';

  import { addMap } from '../../helpers/maps';

  export let isOpen = false;

  let imgSrc: string;
  let imgPath: string;
  let name: string;

  const dispatch = createEventDispatcher();

  function handleSubmit() {
    addMap(name, imgPath).then(() => {
      closeModal();
      dispatch('mapAdded');
    });
  }

  async function chooseImage() {
    
    const path = await dialog.open({
      filters: [{
        name: 'Image',
        extensions: ['jpg', 'jpeg', 'png'],
      }]
    }) as string;

    if(path) {
      imgPath = path;
      imgSrc = convertFileSrc(imgPath);
    }

  }

  function closeModal() {
    imgSrc = undefined;
    name = undefined;
    isOpen = false;
  }

</script>

<Modal bind:open={isOpen} dialogClasses="modal-dialog-centered">
  <form on:submit|preventDefault={handleSubmit}>

    <div class="modal-header">
      <h5 class="modal-title">Add a new map</h5>
      <button type="button" class="btn-close" on:click={closeModal}></button>
    </div>

    <div class="modal-body">

      <div class="d-flex flex-column align-items-center">  
        {#if imgSrc}
          <img src={imgSrc} class="map-img" alt="Map"/>
        {:else}
          <div class="map-img img-placeholder"/>
        {/if}
        <button type="button" class="btn btn-primary mx-auto my-2" on:click={chooseImage}>Choose image</button>
        <input type="text" class="hidden-input" bind:value={imgSrc} required/>
      </div>

      <div class="d-flex align-items-center">
        <label for="name-input" class="form-label my-0 me-3">Name</label>
        <input type="text" class="form-control" id="name-input" bind:value={name} required>
      </div>

    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
      <button type="submit" class="btn btn-primary">Add</button>
    </div>

  </form>
</Modal>


<style lang="scss">

  .map-img {
    background-color: #bababa;
    border-radius: .25rem;
    aspect-ratio: 16/9;
    width: 66%;
    object-fit: contain;
  }

</style>
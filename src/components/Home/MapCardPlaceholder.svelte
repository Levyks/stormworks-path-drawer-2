<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

</script>


<div class="card" on:click={(e) => dispatch('click', e)}>
  <div class="card-img-top">
    <strong>+</strong>
  </div>
  <div class="card-body">
    <div class="card-title"/>
  </div>
</div>


<style lang="scss">

  .card {
    max-width: 400px;

    cursor: pointer;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .25s transform ease, .25s box-shadow ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
    }
  }

  .card-img-top {
    background-color: #bababa;
    height: 8rem;
    
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-size: 6rem;
  }

  .card-title {
    width: 60%;
    height: 1rem;
    margin: 0.33rem 0;
    border-radius: .4rem;
    background-color: #bababa;
  }
  
</style>
<script lang="ts">

  import { Router, Route } from "svelte-routing";

	import Home from './components/Home';

</script>

<div>
	<Router>
		<Route path="/" component={Home} />
	</Router>
</div>

<style lang="scss">
	
	:global(html, body) {
		height: 100%;
	}

	:global(*) {
		font-family: sans-serif;
		user-select: none;
	}

	:global(.hidden-input) {
		width: 0px;
		height: 0px;
		margin: 0;
		padding: 0;
		opacity: 0;
	}

	div {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
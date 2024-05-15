<script lang="ts">
	import type { NewsWidget } from '$lib/data/widgets';

	export let widget: NewsWidget;
</script>

{widget.type} Widget :)
<p>Hallo</p>

<style lang="scss">
  p {
	  color: red;
  }
</style>

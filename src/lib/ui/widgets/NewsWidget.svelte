<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import type { NewsWidget } from '$lib/data/widgets';
	export let widget: NewsWidget;

	let articles = writable<any[]>([]);
	let error = writable(null);

	const fetchNews = async () => {
		try {
			const res = await fetch(
				`https://newsapi.org/v2/top-headlines?country=${widget.country}&category=${widget.category}&apiKey=${widget.apiKey}`,
			);
			const data = await res.json();
			if (data.status === 'error') {
				throw new Error(data.message);
			}
			articles.set(data.articles.slice(0, 3));
			error.set(null);
		} catch (err: any) {
			error.set(err.message);
		}
	};

	onMount(() => {
		fetchNews();
		const interval = setInterval(fetchNews, 3600000); // 3600000 ms = 1 hour
		return () => clearInterval(interval);
	});
</script>

<div class="news-widget">
	{#if $error}
		<p>{$error}</p>
	{:else}
		{#each $articles as article}
			<div class="article">
				{#if article.urlToImage}
					<img src={article.urlToImage} alt={article.title} />
				{/if}
				<p class="article-title">
					{article.title.split(' ').slice(0, 8).join(' ')}{article.title.split(' ').length > 8
						? '...'
						: ''}
				</p>
			</div>
		{/each}
	{/if}
</div>

<style>
	.news-widget {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.article {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}
	.article img {
		max-width: 30%;
		height: auto;
	}
	.article-title {
		font-size: 1rem;
		font-weight: bold;
	}
</style>

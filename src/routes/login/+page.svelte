<script lang="ts">
	import { enhance } from '$app/forms';
	import { page, updated } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import type { SubmitFunction } from './$types';
	import { goto } from '$app/navigation';

	export let redirectTo = $page.url.searchParams.get('redirectTo');
</script>

<div class="login-title">Login</div>

<div class="login">
	<form action="?/login" method="POST" class="auth-form" use:enhance>
		<input type="text" class="name" name="email" placeholder="Email" /> <br />
		<input type="password" class="name" name="password" placeholder="Password" />
		<div class="login-button">
			<button>Login</button>
		</div>
		<input type="hidden" name="redirect" value={redirectTo} />
	</form>
</div>

<!-- src/routes/+layout.svelte -->
<!-- ... (previous code) ... -->

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: antiquewhite;
		font-size: 20px;
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
	}

	.login {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	input {
		margin: 2px;
		padding: 12px 20px 12px 20px;
		box-sizing: border-box;
		border-radius: 0.5rem;
		border: none;
	}

	.login-title {
		margin: auto;
		font-size: 90px;
		color: #7f7469;
		text-align: center;
		margin-top: 200px;
		margin-bottom: 50px;
	}

	.login-button button {
		color: #ffffff;
		background-color: #6a400c;
		text-align: center;
		font-size: 20px;
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';

		border: none;
		border-radius: 0.5rem;
		padding: 10px 68px 10px 68px;
		margin-top: 10px;
	}
</style>

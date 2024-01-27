<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	const register: SubmitFunction = ({ form, data, action, cancel }) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					alert('Please correctly fill out all fields');
					break;
				case 'success':
					alert('Please verify your email');
					goto('/');
					break;
				default:
					await update();
			}
		};
	};
</script>

<div class="login-title">Sign Up</div>

<div class="login">
	<form action="?/signup" method="POST" class="auth-form" use:enhance>
		<input type="text" class="name" name="firstname" placeholder="First Name" /><br />
		<input type="text" class="name" name="lastname" placeholder="Last Name" /><br />
		<input type="text" class="name" name="avatar-url" placeholder="Avatar URL" /><br />
		<input type="text" class="name" name="email" placeholder="Email" /><br />
		<input type="password" class="name" name="password" placeholder="Password" />
		<div class="login-button">
			<button>Sign Up</button>
		</div>
	</form>
</div>

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
		margin-bottom: 600px;
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
		margin-top: 150px;
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
		padding: 10px 60px 10px 56px;
		margin-top: 10px;
	}
</style>

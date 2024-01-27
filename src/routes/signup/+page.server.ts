import { AuthApiError } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) {
		console.log('Logged in, redirecting you to home page');
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	signup: async ({ request, locals }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');
		const firstname = formData.get('firstname');
		const lastname = formData.get('lastname');

		const avatar_url = formData.get('avatar-url');

		const { data, error: err } = await supabase.auth.signUp({
			email: email as string,
			password: password as string,
			options: {
				data: {
					emailRedirectTo: `../auth/callback`,
					first_name: firstname as string,
					last_name: lastname as string,
					avatar_url: avatar_url as string
				}
			}
		});

		if (err) {
			console.log(err);
			if (err instanceof AuthApiError && err.status == 400) {
				return fail(400, { message: 'Invalid email or password' });
			}
			return fail(500, { message: 'Server error. Plase try again later.' });
		} else {
			return { success: true };
		}
	}
};

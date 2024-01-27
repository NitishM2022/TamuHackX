import type { Database } from '$lib/db/types.js';

export const load: PageLoad = async ({ parent, data, locals: { supabase } }) => {
	const { session } = await parent();

	return {
		session
	};
};

export const actions: Actions = {};

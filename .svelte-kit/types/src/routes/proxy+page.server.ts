// @ts-nocheck
import type { Database } from '$lib/db/types.js';

export const load = async ({ parent, data, locals: { supabase } }: Parameters<PageLoad>[0]) => {
	const { session } = await parent();

	return {
		session
	};
};

export const actions = {};
;null as any as Actions;
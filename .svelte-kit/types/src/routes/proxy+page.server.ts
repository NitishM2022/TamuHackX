// @ts-nocheck
import type { Database } from "$lib/db/types.js";

export const load = async ({
  parent,
  data,
  locals: { supabase },
}: Parameters<PageLoad>[0]) => {
  const { session } = await parent();
  const uid = session?.user.id;
  const { data: seatInfo, error } = await supabase
    .from("seats")
    .select("flightnumber, date, seatnumber")
    .eq("profile_id", uid);

  console.log(error);

  return {
    session,
    seatInfo,
  };
};

// export const actions: Actions = {
//   search: async ({ request, locals: { supabase } }) => {
//     const formData = await request.formData();
//     const city = formData.get("city");
//     const uid = formData.get("uid");

//     const { data: found, error } = await supabase.rpc(
//       "get_events_with_following_attendees",
//       {
//         user_id: uid,
//         user_city: city,
//       }
//     );

//     console.log(found);
//     console.log(error);
//     return {
//       success: true,
//       found,
//     };
//   },
//   rsvp: async ({ request, locals: { supabase } }) => {
//     const formData = await request.formData();
//     const uid = formData.get("uid");
//     const eventId = formData.get("event_id");

//     const { error } = await supabase
//       .from("attending")
//       .insert({ event_id: eventId, person_id: uid });
//     console.log(error);
//     return {
//       success: error == null,
//     };
//   },
// };

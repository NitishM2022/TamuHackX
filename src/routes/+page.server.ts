import type { Database } from "$lib/db/types.js";

export const load: PageLoad = async ({
  parent,
  data,
  locals: { supabase },
}) => {
  const { session } = await parent();
  const uid = session?.user.id;

  if (session != null) {
    //find flights
    const { data: seatInfo, error } = await supabase
      .from("seats")
      .select("flightnumber, date, seatnumber")
      .eq("profile_id", uid);

    // use american airlines api
    const allFlightInfo = [];

    for (const seat of seatInfo) {
      const { date, flightnumber, seatnumber } = seat;

      const apiUrl = `http://localhost:4000/flights?date=${date}&flightNumber=${flightnumber}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const flightInfo = await response.json();
        if (flightInfo.length > 0) {
          const firstFlight = flightInfo[0];

          // Add the firstFlight to the array
          allFlightInfo.push(firstFlight);
        }
      } catch (fetchError) {
        console.error("Error fetching flight information:", fetchError);
      }
    }

    return {
      session,
      seatInfo,
      allFlightInfo,
    };
  }

  return {
    session,
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

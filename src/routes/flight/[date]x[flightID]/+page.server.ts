export const load: PageLoad = async ({
  params,
  parent,
  locals: { supabase },
}) => {
  const { session } = await parent();
  const uid = session?.user.id;

  const date = params.date;
  const flightnumber = params.flightID;

  // use database to get seat number
  const { data: seatInfo, error } = await supabase
    .from("seats")
    .select("seatnumber")
    .eq("profile_id", uid);

  // use american airline api to get seat numbers
  const apiUrl = `http://localhost:4000/flights?date=${date}&flightNumber=${flightnumber}`;

  console.log(apiUrl);

  let firstFlight;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const flightInfo = await response.json();
    if (flightInfo.length > 0) {
      firstFlight = flightInfo[0];
    }
  } catch (fetchError) {
    console.error("Error fetching flight information:", fetchError);
  }

  console.log(firstFlight);
  return {
    uid,
    seatInfo,
    firstFlight,
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

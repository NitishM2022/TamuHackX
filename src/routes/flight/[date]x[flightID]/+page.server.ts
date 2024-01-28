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
    .select("seatnumber, flightnumber, date")
    .eq("profile_id", uid);

  // use database to get list of all taken seats
  const { data: takenSeats, error1 } = await supabase
    .from("seats")
    .select("seatnumber, profile_id")
    .neq("profile_id", uid)
    .eq("flightnumber", seatInfo[0].flightnumber)
    .eq("date", seatInfo[0].date);

  // use american airline api to get seat numbers
  const apiUrl = `http://localhost:4000/flights?date=${date}&flightNumber=${flightnumber}`;

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

  return {
    uid,
    seatInfo,
    firstFlight,
    takenSeats,
  };
};

export const actions: Actions = {
  swapEmpty: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const uid = formData.get("uid");

    const i = parseInt(formData.get("i"), 10);
    const j = parseInt(formData.get("j"), 10);
    const newSeat = i * 9 + j;

    const { data, error } = await supabase
      .from("seats")
      .update({ seatnumber: newSeat })
      .eq("profile_id", uid);

    return {
      success: true,
    };
  },
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

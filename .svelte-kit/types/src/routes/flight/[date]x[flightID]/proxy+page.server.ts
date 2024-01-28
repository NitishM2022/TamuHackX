// @ts-nocheck
import { supabase } from "$lib/server/supabase";

export const load = async ({
  params,
  parent,
  locals: { supabase },
}: Parameters<PageLoad>[0]) => {
  const { session } = await parent();
  const uid = session?.user.id;

  const date = params.date;
  const flightnumber = params.flightID;

  // use database to get seat number
  const { data: seatInfo, error } = await supabase
    .from("seats")
    .select("seatnumber, flightnumber, date, seat_id")
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

export const actions = {
  swapEmpty: async ({ request, locals: { supabase } }: import('./$types').RequestEvent) => {
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
  swapTaken: async ({ request, locals: { supabase } }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    const uid = formData.get("uid");

    const origin = formData.get("origin");
    const destination = formData.get("destination");
    const askerseatnumber = formData.get("askerseatnumber");
    const flightnumber = formData.get("flightnumber");
    const date = formData.get("date");
    const seatid = formData.get("seatid");
    const i = parseInt(formData.get("i"), 10);
    const j = parseInt(formData.get("j"), 10);
    const newSeat = i * 9 + j;
    console.log(newSeat);

    //call seats to get provide id and their seatid
    const { data: provider, error } = await supabase
      .from("seats")
      .select("seat_id, profile_id")
      .eq("date", date)
      .eq("flightnumber", flightnumber)
      .eq("seatnumber", newSeat);

    console.log(origin);
    console.log(destination);
    console.log(askerseatnumber);
    console.log(error);
    console.log(flightnumber);
    console.log(date);
    console.log(uid);
    console.log(seatid);
    console.log(provider[0].profile_id);
    console.log(provider[0].seat_id);

    const { error1 } = await supabase.from("offers").insert({
      origin: origin,
      destination: destination,
      flightnumber: flightnumber,
      date: date,
      asker_profile_id: uid,
      asker_seat_number: askerseatnumber,
      asker_seat_id: seatid,
      provider_profile_id: provider[0].profile_id,
      provider_seat_number: newSeat,
      provider_seat_id: provider[0].seat_id,
    });

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
;null as any as Actions;
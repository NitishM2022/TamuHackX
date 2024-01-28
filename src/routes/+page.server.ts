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
      .select("flightnumber, date, seatnumber, seat_id")
      .eq("profile_id", uid);

    console.log("seatinfo" + seatInfo);
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
      uid,
      session,
      seatInfo,
      allFlightInfo,
    };
  }

  return {
    session,
  };
};

export const actions: Actions = {
  sellSeat: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const origin = formData.get("origin");
    const destination = formData.get("destination");
    const flightnumber = formData.get("flightnumber");
    const date = formData.get("date");
    const uid = formData.get("uid");
    const seatnumber = formData.get("seatnumber");
    const seatid = formData.get("seatid");
    const price = parseInt(formData.get("price"), 10);

    console.log(origin);
    console.log(destination);
    console.log(seatnumber);
    console.log(flightnumber);
    console.log(date);
    console.log(uid);
    console.log(seatid);

    const { error } = await supabase.from("market").insert({
      origin: origin,
      destination: destination,
      flightnumber: flightnumber,
      date: date,
      asker_profile_id: uid,
      asker_seat_number: seatnumber,
      asker_seat_id: seatid,
      price: price,
    });

    console.log(error);
    return {
      success: true,
    };
  },
};

import { supabase } from "$lib/server/supabase";

export const load: PageLoad = async ({
  params,
  parent,
  locals: { supabase },
}) => {
  const { session } = await parent();
  const uid = session?.user.id;

  const date = params.date;
  const flightnumber = params.flightid;
  const seatnumber = params.seatnumber;
  console.log(seatnumber);
  console.log(flightnumber);
  console.log(date);

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
    flightnumber,
    date,
    firstFlight,
    seatnumber,
  };
};

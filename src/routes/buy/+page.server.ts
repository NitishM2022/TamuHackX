import { supabase } from "$lib/server/supabase";

export const load: PageLoad = async ({
  params,
  parent,
  locals: { supabase },
}) => {
  const { session } = await parent();
  const uid = session?.user.id;

  const date = params.date;
  const flightnumber = params.flightID;

  // use database to get confirm or decline noti
  const { data: buy, error } = await supabase
    .from("market")
    .select()
    .neq("asker_profile_id", uid)
    .is("status", null);

  console.log("buy:");
  console.log(buy);

  return {
    uid,
    buy,
  };
};

export const actions: Actions = {
  buy: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const marketid = formData.get("marketid");
    const askerseatid = formData.get("askerseatid");
    const providerprofileid = formData.get("providerprofileid");

    console.log(marketid);
    console.log(askerseatid);
    console.log(providerprofileid);

    const { error1 } = await supabase
      .from("seats")
      .update({ profile_id: providerprofileid })
      .eq("seat_id", askerseatid);

    // made the offer accepted
    const { error2 } = await supabase
      .from("market")
      .update({ status: "sold" })
      .eq("offer_id", marketid);

    console.log(error2);

    return {
      success: true,
    };
  },
};

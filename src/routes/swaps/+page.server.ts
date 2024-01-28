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
  const { data: confirmnoti, error } = await supabase
    .from("offers")
    .select()
    .eq("provider_profile_id", uid)
    .is("status", null);

  // use database to get view noti
  const { data: viewnoti, error1 } = await supabase
    .from("offers")
    .select()
    .eq("asker_profile_id", uid);

  return {
    uid,
    confirmnoti,
    viewnoti,
  };
};

export const actions: Actions = {
  confirm: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const offerid = formData.get("offerid");
    const askerprofileid = formData.get("askerprofileid");
    const askerseatid = formData.get("askerseatid");
    const providerprofileid = formData.get("providerprofileid");
    const providerseatid = formData.get("providerseatid");

    console.log(askerprofileid);
    console.log(providerprofileid);

    console.log(askerseatid);
    console.log(providerseatid);

    // switch them
    const { error1 } = await supabase
      .from("seats")
      .update({ profile_id: providerprofileid })
      .eq("seat_id", askerseatid);

    console.log("error1" + error1);

    // switch them
    const { error } = await supabase
      .from("seats")
      .update({ profile_id: askerprofileid })
      .eq("seat_id", providerseatid);

    console.log("error" + error);

    // made the offer accepted
    const { error2 } = await supabase
      .from("offers")
      .update({ status: "accepted" })
      .eq("offer_id", offerid);

    return {
      success: true,
    };
  },
  deny: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const offerid = formData.get("offerid");

    // made the offer denied
    const { data, error2 } = await supabase
      .from("offers")
      .update({ status: "denied" })
      .eq("offer_id", offerid);

    return {
      success: true,
    };
  },
};

<script lang="ts">
  import { enhance } from "$app/forms";

  //popup window
  let showModal = false;

  export let data;
  export let form;

  function seatName(seatNumber: number) {
    let name: string = "";
    name += seatNumber % 9;
    name += String.fromCharCode("A".charCodeAt(0) + seatNumber / 9);
    return name;
  }

  console.log(data.buy);
</script>

<div class="container">
  {#if data.buy.length > 0}
    <h2>Confirm or Deny</h2>

    <table border="1">
      <thead>
        <tr>
          <th>Origin</th>
          <th>Destination</th>
          <th>Date</th>
          <th>Flight Number</th>
          <th>Seat</th>
          <th>Price</th>
          <th>Confirm</th>
        </tr>
      </thead>
      <tbody>
        {#each data.buy as { origin, destination, flightnumber, date, offer_id, asker_profile_id, asker_seat_number, asker_seat_id, price }, i}
          <tr>
            <td>{origin}</td>
            <td>{destination}</td>
            <td>{date}</td>
            <td>{flightnumber}</td>
            <td>{seatName(asker_seat_number)}</td>
            <td>${price}</td>
            <td>
              <form action="?/buy" method="POST">
                <input type="hidden" name="marketid" value={offer_id} />
                <input
                  type="hidden"
                  name="askerprofileid"
                  value={asker_profile_id}
                />
                <input type="hidden" name="askerseatid" value={asker_seat_id} />
                <input
                  type="hidden"
                  name="providerprofileid"
                  value={data.uid}
                />

                <button>Purchase</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  {#if data.buy.length == 0}
    <h2>No seats for sale</h2>
  {/if}
</div>

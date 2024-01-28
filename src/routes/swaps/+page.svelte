<script lang="ts">
  import { enhance } from "$app/forms";

  //popup window
  let showModal = false;

  export let data;
  export let form;

  function seatName(seatNumber: number) {
    let name: string = "";
    name += Math.floor(seatNumber / 9);
    name += String.fromCharCode("A".charCodeAt(0) + (seatNumber % 9));
    return name;
  }

  console.log(data.confirmnoti);
  console.log(data.viewnoti);
</script>

<div class="container">
  {#if data.confirmnoti.length > 0}
    <hgroup><h2>Confirm or Deny</h2></hgroup>

    <section id="tables">
      <table role="grid">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Flight Number</th>
            <th>New Seat</th>
            <th>Current Seat</th>
            <th>Confirm</th>
            <th>Deny</th>
          </tr>
        </thead>
        <tbody>
          {#each data.confirmnoti as { origin, destination, flightnumber, date, offer_id, asker_profile_id, asker_seat_number, asker_seat_id, provider_seat_number, provider_seat_id }, i}
            <tr>
              <td>{origin}</td>
              <td>{destination}</td>
              <td>{date}</td>
              <td>{flightnumber}</td>
              <td>{seatName(asker_seat_number)}</td>
              <td>{seatName(provider_seat_number)}</td>
              <td>
                <form action="?/confirm" method="POST">
                  <input type="hidden" name="offerid" value={offer_id} />
                  <input
                    type="hidden"
                    name="askerprofileid"
                    value={asker_profile_id}
                  />
                  <input
                    type="hidden"
                    name="askerseatid"
                    value={asker_seat_id}
                  />
                  <input
                    type="hidden"
                    name="providerprofileid"
                    value={data.uid}
                  />
                  <input
                    type="hidden"
                    name="providerseatid"
                    value={provider_seat_id}
                  />
                  <button>Confirm</button>
                </form>
              </td>
              <td>
                <form action="?/deny" method="POST">
                  <input type="hidden" name="offerid" value={offer_id} />
                  <button>Deny</button>
                </form></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  {/if}

  {#if data.viewnoti.length > 0}
    <hgroup><h1>Potential Swaps</h1></hgroup>

    <section id="tables">
      <table role="grid">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Flight Number</th>
            <th>Current Seat</th>
            <th>Potential Seat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each data.viewnoti as { origin, destination, flightnumber, date, offer_id, asker_seat_number, asker_seat_id, provider_provile_id, provider_seat_number, provider_seat_id, status }, i}
            <tr>
              <td>{origin}</td>
              <td>{destination}</td>
              <td>{date}</td>
              <td>{flightnumber}</td>
              <td>{seatName(asker_seat_number)}</td>
              <td>{seatName(provider_seat_number)}</td>
              {#if status}
                <td>{status}</td>
              {:else}
                <td>No Confirmation</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  {/if}

  {#if data.confirmnoti.length == 0 && data.viewnoti.length == 0}
    <h2>No Swaps</h2>
  {/if}
</div>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
  .yourSeat {
    background-color: green;
  }
  .takenSeat {
    background-color: red;
  }
</style>

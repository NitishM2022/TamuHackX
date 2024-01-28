<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import Modal from "../components/Modal.svelte";

  let showModal = false;
  let curri: number = 0;

  export let data;
  function handleSell(i: number) {
    showModal = true;
    curri = i;
    console.log(i);
  }
  function seatName(seatNumber: number) {
    let name: string = "";
    name += Math.floor(seatNumber / 9);
    name += String.fromCharCode("A".charCodeAt(0) + (seatNumber % 9));
    return name;
  }
  console.log(data.allFlightInfo);
  console.log(data.seatInfo);
</script>

<div class="container">
  <hgroup>
    <h1>AeroTrade</h1>
    <p>Powered by American Airlines</p>
  </hgroup>
  {#if data.seatInfo && data?.seatInfo.length > 0 && data.allFlightInfo && data?.allFlightInfo.length > 0}
    <div class="flight">
      <section id="tables">
        <hgroup>
          <h1>Your Flights</h1>
          <p>Swap, Sell, or Buy Flights</p>
        </hgroup>
        <figure>
          <table role="grid">
            <thead>
              <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Flight Number</th>
                <th>Seat Number</th>
                <th>Swap Seats</th>
                <th>Sell Seat</th>
              </tr>
            </thead>
            <tbody>
              {#each data.seatInfo as { flightnumber, date, seatnumber, seat_id }, i}
                <tr>
                  <td>{data.allFlightInfo[i].origin.city}</td>
                  <td>{data.allFlightInfo[i].destination.city}</td>
                  <td>{date}</td>
                  <td>{flightnumber}</td>
                  <td>{seatName(seatnumber)}</td>
                  <td
                    ><button
                      type="reset"
                      onclick="location.href='/flight/{date}x{flightnumber}'"
                      >->></button
                    ></td
                  >
                  <td
                    ><button on:click={() => handleSell(i)} class="btn"
                      >->></button
                    ></td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </figure>
      </section>
    </div>
  {/if}
</div>

{#if data.uid && data.seatInfo.length > 0}
  <Modal bind:showModal>
    <h2 slot="header">
      Would you like to sell seat {seatName(data.seatInfo[curri].seatnumber)}
    </h2>

    {#if data.allFlightInfo != undefined && data.seatInfo.length > 0}
      <form action="?/sellSeat" method="POST">
        <input type="hidden" name="uid" value={data.uid} />
        <input
          type="hidden"
          name="origin"
          value={data.allFlightInfo[curri].origin.city}
        />
        <input
          type="hidden"
          name="destination"
          value={data.allFlightInfo[curri].destination.city}
        />
        <input
          type="hidden"
          name="flightnumber"
          value={data.seatInfo[curri].flightnumber}
        />
        <input type="hidden" name="date" value={data.seatInfo[curri].date} />
        <input
          type="hidden"
          name="seatnumber"
          value={data.seatInfo[curri].seatnumber}
        />
        <input
          type="hidden"
          name="seatid"
          value={data.seatInfo[curri].seat_id}
        />

        <p>If you would like to list your seat on the market list a price</p>
        <input type="number" name="price" />

        <button class="">Confirm</button>
        <p>Check your dash if your seat was sold</p>
      </form>
    {/if}
  </Modal>
{/if}

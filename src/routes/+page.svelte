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
    name += seatNumber % 9;
    name += String.fromCharCode("A".charCodeAt(0) + seatNumber / 9);
    return name;
  }
  console.log(data.allFlightInfo);
</script>

<div class="title">
  <h1>AirSwap</h1>
  <p>Swap seats with other customers</p>
</div>
{#if data?.seatInfo && data?.allFlightInfo}
  <div class="flight">
    <h1>Your Flights</h1>
    <table border="1">
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
            <td><a href="/flight/{date}x{flightnumber}" class="btn">->></a></td>
            <td
              ><button on:click={() => handleSell(i)} class="btn">->></button
              ></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<Modal bind:showModal>
  <h2 slot="header">
    Would you like to sell seat {seatName(data.seatInfo[curri].seatnumber)}
  </h2>

  {#if data.allFlightInfo != undefined && data.seatInfo.length > 0}
    <ol class="steps">
      <form action="?/sellSeat" method="POST">
        <li>
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
          <p>
            If you would like to list your seat on the market list a price <input
              type="number"
              name="price"
            />
          </p>
        </li>
        <li>
          <p>
            Click <button class="">Confirm</button>
          </p>
        </li>
        <li>Check your notifications if your swap was approved</li>
      </form>
    </ol>
  {/if}
</Modal>

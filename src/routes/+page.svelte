<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  export let data;
  console.log(data.allFlightInfo);
</script>

<div class="title">
  <h1>AirSwap</h1>
  <p>Swap seats with other customers</p>
</div>

<div class="flight">
  <h1>Your Flights</h1>
  {#if data?.seatInfo && data?.allFlightInfo}
    <table border="1">
      <thead>
        <tr>
          <th>Origin</th>
          <th>Destination</th>
          <th>Date</th>
          <th>Flight Number</th>
          <th>Seat Number</th>
          <th>Swap Seats</th>
        </tr>
      </thead>
      <tbody>
        {#each data.seatInfo as { flightnumber, date, seatnumber }, i}
          <tr>
            <td>{data.allFlightInfo[i].origin.city}</td>
            <td>{data.allFlightInfo[i].destination.city}</td>
            <td>{date}</td>
            <td>{flightnumber}</td>
            <td>{seatnumber}</td>
            <td><a href="/flight/{date}x{flightnumber}" class="btn">->></a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

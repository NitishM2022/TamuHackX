<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  export let data;
  console.log(data.seatInfo);
</script>

<div class="title">
  <h1>AirSwap</h1>
  <p>Swap seats with other customers</p>
</div>

<div class="flight">
  <h1>Your Flights</h1>
  {#if data?.seatInfo}
    {#each data?.seatInfo as { flightnumber, date, seatnumber }, it}
      <p>{flightnumber} {seatnumber} {date}</p>
    {/each}
  {/if}
</div>

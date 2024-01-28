<script lang="ts">
  import { enhance } from "$app/forms";
  import Modal from "../../../components/Modal.svelte";

  //popup window
  let showModal = false;

  export let data;
  export let form;

  const seatInfo = data.seatInfo;
  const seatsTaken = data.takenSeats;
  const flightCapcity = data.firstFlight.aircraft.passengerCapacity.main;
  const rows: number = flightCapcity / 9;
  let row;
  let col = 0;

  function seatName(i: number, j: number) {
    let name: string = "";
    name += i;
    name += String.fromCharCode("A".charCodeAt(0) + j);
    return name;
  }
  function sameSeat(i: number, j: number) {
    const seat: number = i * 9 + j;
    if (seat == seatInfo[0].seatnumber) {
      return true;
    }
    return false;
  }
  function someoneSeat(i: number, j: number) {
    const currSeat: number = i * 9 + j;
    for (const seat of seatsTaken) {
      if (seat.seatnumber == currSeat) {
        return true;
      }
    }
    return false;
  }
  function handleSwap(i: number, j: number) {
    const swapSeatNumber: number = i * 9 + j;
    showModal = true;
    row = i;
    col = j;
  }
</script>

<div class="container">
  <hgroup>
    <h1>Flight ID: {data.seatInfo[0].flightnumber}</h1>
    <h1>Date: {data.seatInfo[0].date}</h1>
  </hgroup>

  <div
    style="display: flex; align-items: center; justify-content: space-between; margin-bottom:2%;"
  >
    <h3 style="margin: 0;">Front</h3>

    <!-- Key for seat status -->
    <div style="display: flex; align-items: center;">
      <div
        style="width: 20px; height: 20px; background-color: green; border-radius: 50%; margin-right: 5px;"
      />
      <span>Your Seat</span>
      <div
        style="width: 20px; height: 20px; background-color: red; border-radius: 50%; margin-left: 20px; margin-right: 5px;"
      />
      <span>Taken Seat (You Can Request)</span>
    </div>
  </div>
  <table
    style="border-collapse: separate; border-spacing: 10px; border-radius: 5px;"
  >
    <thead>
      <tr>
        <th
          style="border: none; padding: 10px; background-color: #f2f2f2; text-align: center;"
          >Window</th
        >
        <th
          style="border: none; padding: 10px; background-color: rgb(230, 230, 230); text-align: center;"
          >Middle</th
        >
        <th
          style="border: none; padding: 10px; background-color: #f2f2f2; text-align: center;"
          >Window</th
        >
      </tr>
    </thead>
  </table>

  <table style="border-collapse: collapse;">
    <tbody style="border: none;">
      {#each { length: rows } as _, i}
        <tr style="border: none;">
          <td style="border: none; height: 100%;">
            <button
              style="background-color: lightblue; border: 2px solid lightblue;  width: 33.33%; height: 60px; border-radius:50px"
              disabled
            />
          </td>

          {#each { length: 9 } as _, j}
            {#if sameSeat(i, j)}
              <td style="border: none;">
                <form>
                  <button
                    style="background-color: green; color: white; border: 2px solid green;"
                    disabled
                  >
                    {seatName(i, j)}</button
                  >
                </form></td
              >
            {:else if someoneSeat(i, j)}
              <td style="border: none;">
                <form>
                  <button
                    on:click={() => handleSwap(i, j)}
                    style="background-color: red; color: white; border: 2px solid red;"
                  >
                    {seatName(i, j)}</button
                  >
                </form>
              </td>
            {:else}
              <td style="border: none;">
                <form action="?/swapEmpty" method="POST">
                  <input type="hidden" name="uid" value={data.uid} />
                  <input type="hidden" name="i" value={i} />
                  <input type="hidden" name="j" value={j} />
                  <button class="">{seatName(i, j)}</button>
                </form>
              </td>
            {/if}
          {/each}
          <td style="border: none; height: 100%;">
            <button
              style="background-color: lightblue; border: 2px solid lightblue;  width: 33.33%; height: 60px; border-radius:50px"
              disabled
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<Modal bind:showModal>
  <h2 slot="header">
    Would you like to swap seats with seat {seatName(row, col)}
  </h2>

  <form action="?/swapTaken" method="POST">
    <input type="hidden" name="uid" value={data.uid} />
    <input
      type="hidden"
      name="askerseatnumber"
      value={data.seatInfo[0].seatnumber}
    />
    <input
      type="hidden"
      name="flightnumber"
      value={data.seatInfo[0].flightnumber}
    />
    <input type="hidden" name="origin" value={data.firstFlight.origin.city} />
    <input
      type="hidden"
      name="destination"
      value={data.firstFlight.destination.city}
    />
    <input type="hidden" name="date" value={data.seatInfo[0].date} />
    <input type="hidden" name="seatid" value={data.seatInfo[0].seat_id} />
    <input type="hidden" name="i" value={row} />
    <input type="hidden" name="j" value={col} />
    <p>If you would like to swap click</p>
    <button class="">Confirm</button>
  </form>
  <p>Check your notifications if your swap was approved</p>
</Modal>

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
</style>

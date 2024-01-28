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
  let row, col;

  function propj(j: number) {
    if (j >= 3) {
      if (j >= 7) {
        return j - 2;
      }
      return j - 1;
    }
    return j;
  }

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

<h2>Airplane Seating Chart</h2>

<table>
  <thead>
    <tr>
      <th>Window</th>
      <td />
      <th>Middle</th>
      <td />
      <th>Window</th>
    </tr>
  </thead>
</table>
<table>
  <tbody>
    {#each { length: rows } as _, i}
      <tr>
        {#each { length: 11 } as _, j}
          {#if j == 3 || j == 7}
            <td />
          {:else if sameSeat(i, propj(j))}
            <td class="yourSeat">Your seat</td>
          {:else if someoneSeat(i, propj(j))}
            <td class="takenSeat">
              <button on:click={() => handleSwap(i, propj(j))}>
                Taken (You Must Request)</button
              >
            </td>
          {:else}
            <td>
              <form action="?/swapEmpty" method="POST">
                <input type="hidden" name="uid" value={data.uid} />
                <input type="hidden" name="i" value={i} />
                <input type="hidden" name="j" value={propj(j)} />
                <button class="">{seatName(i, propj(j))}</button>
              </form>
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<Modal bind:showModal>
  <h2 slot="header">
    Would you like to swap seats with seat {seatName(row, col)}
  </h2>

  <ol class="steps">
    <li>If you would like to swap click <button>Confirm</button></li>
    <li>Check back every couple of days to see if you swap was accepted</li>
  </ol>
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

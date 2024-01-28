<script lang="ts">
  import { enhance } from "$app/forms";
  import Modal from "../../../components/Modal.svelte";

  function handleSubmit() {
    // ...

    return async ({ update }) => {
      await update({ reset: false });
    };
  }

  //popup window
  let showModal = false;

  export let data;
  export let form;

  const seatInfo = data.seatInfo;
  const flightCapcity = data.firstFlight.aircraft.passengerCapacity.main;
  const columns: number = flightCapcity / 9;
  console.log(seatInfo);

  function seatName(i: number, j: number) {
    let name: string = "";
    name += j;
    name += String.fromCharCode("A".charCodeAt(0) + i);
    return name;
  }
  function sameSeat(i: number, j: number) {
    const seat: number = i * 9 + j;
    if (seat == seatInfo[0].seatnumber) {
      return true;
    }
    return false;
  }
  function handleSwap(i: number, j: number) {
    const swapSeatNumber: number = i * 9 + j;
    console.log("swap" + swapSeatNumber);
    showModal = true;
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
    {#each { length: columns } as _, i}
      <tr>
        {#if sameSeat(i, 1)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td>
            <button on:click={() => handleSwap(i, 1)}>{seatName(i, 1)}</button>
          </td>
        {/if}
        {#if sameSeat(i, 2)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 2)}>{seatName(i, 2)}</button
            ></td
          >
        {/if}
        {#if sameSeat(i, 3)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 3)}>{seatName(i, 3)}</button
            ></td
          >
        {/if}
        <td />
        {#if sameSeat(i, 4)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 4)}>{seatName(i, 4)}</button
            ></td
          >
        {/if}
        {#if sameSeat(i, 5)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 5)}>{seatName(i, 5)}</button
            ></td
          >
        {/if}
        {#if sameSeat(i, 6)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 6)}>{seatName(i, 6)}</button
            ></td
          >
        {/if}
        <td />
        {#if sameSeat(i, 7)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 7)}>{seatName(i, 7)}</button
            ></td
          >
        {/if}
        {#if sameSeat(i, 8)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 8)}>{seatName(i, 8)}</button
            ></td
          >
        {/if}
        {#if sameSeat(i, 9)}
          <td class="yourSeat">Your seat</td>
        {:else}
          <td
            ><button on:click={() => handleSwap(i, 9)}>{seatName(i, 9)}</button
            ></td
          >
        {/if}
      </tr>
    {/each}
  </tbody>
</table>

<Modal bind:showModal>
  <h2 slot="header">
    modal
    <small><em>adjective</em> mod·al \ˈmō-dəl\</small>
  </h2>

  <ol class="definition-list">
    <li>of or relating to modality in logic</li>
    <li>
      containing provisions as to the mode of procedure or the manner of taking
      effect —used of a contract or legacy
    </li>
    <li>of or relating to a musical mode</li>
    <li>of or relating to structure as opposed to substance</li>
    <li>
      of, relating to, or constituting a grammatical form or category
      characteristically indicating predication
    </li>
    <li>of or relating to a statistical mode</li>
  </ol>

  <a href="https://www.merriam-webster.com/dictionary/modal"
    >merriam-webster.com</a
  >
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
</style>

<script lang="ts">
  import { enhance } from "$app/forms";

  export let data;

  const flightCapcity = data.firstFlight.aircraft.passengerCapacity.main;
  const rows: number = flightCapcity / 9;
  let row;
  let col = 0;

  console.log("heyyyy" + data.flightnumber);

  function seatName(i: number, j: number) {
    let name: string = "";
    name += i;
    name += String.fromCharCode("A".charCodeAt(0) + j);
    return name;
  }
  function sameSeat(i: number, j: number) {
    const seat: number = i * 9 + j;
    if (seat == data.seatnumber) {
      console.log(data.seatnumber);
      console.log(i);
      console.log(j);
      return true;
    }
    return false;
  }
</script>

<div class="container">
  <hgroup>
    <h1>Flight ID: {data.flightnumber}</h1>
    <h1>Date: {data.date}</h1>
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
    </div>
  </div>
  <!-- Heading -->
  <table
    style="border-collapse: separate; border-spacing: 10px; border-radius: 5px; text-align: center;"
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
                <button
                  style="background-color: green; color: white; border: 2px solid green;"
                  disabled
                >
                  {seatName(i, j)}</button
                >
              </td>
              {#if j == 2 || j == 5}
                <td style="border: none;">
                  <button
                    style="background-color: white; border: 2px solid white;  "
                    disabled
                  />
                </td>
              {/if}
            {:else}
              <td style="border: none;">
                <button class="" disabled>{seatName(i, j)}</button>
              </td>
              {#if j == 2 || j == 5}
                <td style="border: none;">
                  <button
                    style="background-color: white; border: 2px solid white;  "
                    disabled
                  />
                </td>
              {/if}
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

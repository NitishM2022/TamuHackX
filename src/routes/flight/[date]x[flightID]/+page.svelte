<script lang="ts">
  import { enhance } from "$app/forms";

  function handleSubmit() {
    // ...

    return async ({ update }) => {
      await update({ reset: false });
    };
  }

  export let data;
  export let form;
</script>

<form action="?/search" method="POST" use:enhance>
  <h1>Events</h1>

  <div class="center">
    <input type="hidden" name="uid" value={data.uid} />
    <input type="text" name="city" placeholder="City" />
    <button class="search-button">Search</button>
  </div>

  <div class="fat" />

  <div class="flex-container-2">
    {#if form?.found}
      {#each form.found as event}
        <div class="profile-box">
          <h3>{event.event_name}</h3>

          <p>{event.event_description}</p>
          {#if event.attendees_from_following.length != 0}
            <div class="attendee">
              <h3>Attendees</h3>
              {#each event.attendees_from_following as person}
                {#if person.first_name}
                  <div class="attendee">
                    <p>{person.first_name} {person.last_name}</p>
                    <img
                      src={person.avatar_url}
                      alt="Profile"
                      class="profile-image"
                    />
                  </div>
                {/if}
              {/each}
            </div>
          {/if}

          <form action="?/rsvp" method="POST" use:enhance>
            <input type="hidden" name="uid" value={data.uid} />
            <input type="hidden" name="event_id" value={event.event_id} />
            <button class="search-button">RSVP</button>
          </form>
        </div>
      {/each}
    {/if}
  </div>
</form>
<br />

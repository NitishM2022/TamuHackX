<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";
  import "../style.css";
  export let data: LayoutData;
  $: ({ supabase, session } = data);
  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        console.log("auth state changed");
        invalidate("supabase:auth");
      }
    });
    return () => subscription.unsubscribe();
  });
</script>

<div class="">
  {#if data.session}
    <div class="navbar">
      <div class="leftbar">
        <a href="/" class="btn">Dash</a>
        <a href="/events" class="btn">Buy</a>
        <a href="/friends" class="btn">Family</a>
      </div>
      <div class="gap" />
      <div class="rightbar">
        <a href="/logout" class="btn">Logout</a>
        {#if data.profile}
          <img
            src={data.profile[0].avatar_url}
            alt="Profile"
            class="profile-image"
          />
        {/if}
      </div>
    </div>
  {:else}
    <div class="navbar">
      <div class="leftbar">
        <a href="/" class="btn">About</a>
      </div>
      <div class="gap" />
      <div class="rightbar">
        <a href="/login" class="btn">Login</a>
        <a href="/signup" class="btn">Sign up</a>
      </div>
    </div>
  {/if}
</div>

<slot />

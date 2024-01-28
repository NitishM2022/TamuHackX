<script lang="ts">
  import { enhance } from "$app/forms";
  import { page, updated } from "$app/stores";
  import { redirect } from "@sveltejs/kit";
  import type { SubmitFunction } from "./$types";
  import { goto } from "$app/navigation";

  export let redirectTo = $page.url.searchParams.get("redirectTo");
</script>

<div class="container">
  <h1 class="">Log In</h1>

  <form action="?/login" method="POST" class="auth-form" use:enhance>
    <input type="text" class="name" name="email" placeholder="Email" />
    <input
      type="password"
      class="name"
      name="password"
      placeholder="Password"
    />
    <div class="login-button">
      <button>Login</button>
    </div>
    <input type="hidden" name="redirect" value={redirectTo} />
  </form>
</div>

<!-- src/routes/+layout.svelte -->
<!-- ... (previous code) ... -->

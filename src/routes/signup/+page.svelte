<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { SubmitFunction } from "@sveltejs/kit";

  const register: SubmitFunction = ({ form, data, action, cancel }) => {
    return async ({ result, update }) => {
      switch (result.type) {
        case "failure":
          alert("Please correctly fill out all fields");
          break;
        case "success":
          alert("Please verify your email");
          goto("/");
          break;
        default:
          await update();
      }
    };
  };
</script>

<div class="container">
  <hgroup><h1>Sign Up</h1></hgroup>

  <form action="?/signup" method="POST" class="auth-form" use:enhance>
    <input type="text" class="name" name="firstname" placeholder="First Name" />
    <input type="text" class="name" name="lastname" placeholder="Last Name" />
    <input
      type="hidden"
      class="name"
      name="avatar-url"
      placeholder="Avatar URL"
    />
    <input type="text" class="name" name="email" placeholder="Email" />
    <input
      type="password"
      class="name"
      name="password"
      placeholder="Password"
    />
    <div class="login-button">
      <button>Sign Up</button>
    </div>
  </form>
</div>

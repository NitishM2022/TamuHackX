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

<div class="login-title">Sign Up</div>

<div class="login">
  <form action="?/signup" method="POST" class="auth-form" use:enhance>
    <input
      type="text"
      class="name"
      name="firstname"
      placeholder="First Name"
    /><br />
    <input
      type="text"
      class="name"
      name="lastname"
      placeholder="Last Name"
    /><br />
    <input
      type="text"
      class="name"
      name="avatar-url"
      placeholder="Avatar URL"
    /><br />
    <input type="text" class="name" name="email" placeholder="Email" /><br />
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

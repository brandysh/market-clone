<script>
  import Nav from "../components/Nav.svelte";
  import { user$ } from "../store";

  const logout = () => {
    //user$값을 널로 변환해서 정보를 지움 / localStorage에 있는 토큰 정보를 지움
    localStorage.removeItem("token");
    user$.set(null);
  };
</script>

<div>나의 당근</div>
<button on:click={logout}>로그아웃</button>
<Nav location="my" />

<style>
  button {
    cursor: pointer;
    border: 1px solid gray;
  }
</style>

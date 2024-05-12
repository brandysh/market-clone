<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div>
  <div>로그인하기</div>
  <button class="login-btn" on:click={loginWithGoogle}>
    <img
      class="google-img"
      src="https://w7.pngwing.com/pngs/869/485/png-transparent-google-logo-computer-icons-google-text-logo-google-logo-thumbnail.png"
      alt=""
    />
    <div>Google로 로그인하기</div>
    <div />
  </button>
</div>

<style>
  .login-btn {
    border: 1px solid tomato;
    border-radius: 5px;
    height: 50px;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .google-img {
    width: 20px;
  }
</style>

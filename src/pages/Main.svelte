<script>
  import { onMount } from "svelte";

  import { getDatabase, ref, onValue } from "firebase/database";
  import { user$ } from "../store";
  import Nav from "../components/Nav.svelte";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();
  let user;
  $: items = [];

  const calcTime = (timestamp) => {
    // const curTime = new Date().getTime(); // 한국시간 (UTC + 9)
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000; // 세계시간으로 맞춰주기
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (minutes > 0) return `${minutes}분 전`;
    else if (second >= 0) return `${second}초 전`;
    else return "방금 전";
  };

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
    const unsubscribe = user$.subscribe((value) => {
      user = value;
    });

    return unsubscribe;
  });
</script>

<header>
  <div class="login-bar">
    {#if user}
      <div>로그인 중: {user.displayName}</div>
    {:else}
      <div>로그인 중이 아닙니다.</div>
    {/if}
  </div>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="차트바" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>대구</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow-down.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu-bar.svg" alt="" />
      <img src="assets/bell.svg" alt="" />
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img src={item.imgUrl} alt={item.title} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-price">{item.price}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<Nav location={"home"} />

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
  .info-bar__time {
    color: blue;
  }
  .login-bar {
    border-radius: 5px;
    width: 120px;
    height: 30px;
    font-size: 13px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

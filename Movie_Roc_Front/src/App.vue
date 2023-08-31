<template>
  <!-- <RouterView> -->
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/M01logo.png" width="200" height="125" />

      <div class="wrapper">
        <HelloWorld msg="Welome!" />

        <nav>
          <RouterLink to="/">团队</RouterLink>
          <RouterLink to="/chat" >机器人</RouterLink>
        </nav>
      </div>
    </header>
    <div style="    margin-left: 130px;"><RouterView class="router-view-container"/></div>
    
    <!-- <Chatpage /> -->
  
</template>
<script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router';
  import HelloWorld from './components/HelloWorld.vue';
  import Chatpage from './views/Chatpage.vue'

  const router = useRouter();

  const navigateToChat = () => {
    router.push('/chat');
  };

</script>

<style>
.router-view-container {
  /* 调整 RouterView 外部容器的样式 */
  margin-left: -5rem; /* 添加左边距，使页面紧凑 */
  flex: 1; /* 使用剩余空间 */
}
header {
  width: 30%;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  /* width: 100%; */
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

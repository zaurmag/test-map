<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="link in links" :key="link.name" class="nav__item">
        <router-link class="nav__link" exact :to="{ name: link.href }">{{
          link.name
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const links = [
  {
    name: 'Главная',
    href: 'home',
  },
  {
    name: 'Объекты',
    href: 'objects',
  },
  {
    name: 'Статистика',
    href: 'stat',
  },
]
</script>

<style scoped lang="scss">
.nav {
  margin-bottom: 30px;
  padding: 10px;
  background-color: var(--vt-c-white-mute);

  &__list {
    list-style: none;
    display: flex;
    place-items: center;
    justify-content: center;
    font-size: 18px;
  }

  &__item {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__link {
    border-radius: 3px;
    display: block;
    padding: 0 10px;

    &.is-active {
      background-color: hsla(160, 100%, 37%, 0.2);
      color: var(--vt-c-black-soft);
    }

    @media (hover: hover) {
      &:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
      }
    }
  }
}
</style>

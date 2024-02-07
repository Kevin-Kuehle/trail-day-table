<script setup>
defineProps(["cols"]);

defineEmits(["onSort"]);

const SORTING_TYPES = {
  ASC: "ASC",
  DESC: "DESC",
};
// count length of an object
const count = (obj) => {
  return Object.keys(obj).length;
};
</script>

<template>
  <div
    :style="{ gridTemplateColumns: `repeat(${Object.keys(cols).length}, 1fr)` }"
    class="c-table-header"
  >
    <template v-for="col in cols" :key="col.id">
      <div class="c-table-header__title fw-bold flex py-3 flex-nowrap">
        <div class="c-table-header__title__name">{{ col }}</div>
        <div class="c-table-header__title__sorting px-2 flex">
          <div
            @click="$emit('onSort', { sortType: SORTING_TYPES.ASC, col: col })"
            class="c-table-header__title__sorting__up hover:cursor-pointer"
          >
            👆
          </div>
          <div
            @click="$emit('onSort', { sortType: SORTING_TYPES.DESC, col: col })"
            class="c-table-header__title__sorting__down hover:cursor-pointer"
          >
            👇
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.c-table-header {
  display: grid;

  &__table-title {
    grid-column: span 1;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";

defineProps(["cols"]);

defineEmits(["onSort"]);

type TSortType = "ASC" | "DESC";

const SORTING_TYPES = {
  ASC: "ASC",
  DESC: "DESC",
};

const sort_type = ref(SORTING_TYPES.ASC);

const sortTypeChanger = (sortType: TSortType) => {
  console.log(`devlog: checl`);
  if (sortType === SORTING_TYPES.ASC) {
    sort_type.value = SORTING_TYPES.DESC;
  } else {
    sort_type.value = SORTING_TYPES.ASC;
  }
};
</script>

<template>
  <div
    :style="{ gridTemplateColumns: `repeat(${Object.keys(cols).length}, 1fr)` }"
    class="c-table-header"
  >
    <template v-for="col in cols" :key="col.id">
      <div class="c-table-header__title fw-bold flex py-3 flex-nowrap">
        <div
          @click="
            $emit('onSort', { sortType: sort_type, col: col });
            sortTypeChanger ? sortTypeChanger(sort_type as TSortType) : null;
          "
          class="c-table-header__title__name"
        >
          {{ col }}
        </div>
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

<script setup lang="ts">
import { ref } from "vue";
import SortSvg from "./SortSvg.vue";

defineProps(["cols"]);

defineEmits(["onSort"]);

type TSortType = "ASC" | "DESC";

const SORTING_TYPES = {
  ASC: "ASC",
  DESC: "DESC",
};

const sort_type = ref(SORTING_TYPES.ASC);

const sortTypeChanger = (sortType: TSortType) => {
  if (sortType === SORTING_TYPES.ASC) {
    sort_type.value = SORTING_TYPES.DESC;
  } else {
    sort_type.value = SORTING_TYPES.ASC;
  }
};

const sortButtonClass = ref("hover:cursor-pointer  py-1 h-[14px] w-4");
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
          class="c-table-header__title__name hover:cursor-pointer"
        >
          {{ col }}
        </div>
        <div
          class="c-table-header__title__sorting px-2 flex flex-col justify-center"
        >
          <div
            @click="$emit('onSort', { sortType: SORTING_TYPES.ASC, col: col })"
            :class="sortButtonClass"
            class="c-table-header__title__sorting__up hover:cursor-pointer"
          >
            <SortSvg />
          </div>
          <div
            @click="$emit('onSort', { sortType: SORTING_TYPES.DESC, col: col })"
            :class="sortButtonClass"
            class="c-table-header__title__sorting__down rotate-180"
          >
            <SortSvg />
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

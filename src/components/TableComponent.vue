<script setup>
import { TableHeader, TableItem } from "./index";
import { ref, watch, computed, reactive } from "vue";
import { sortDataSize } from "../composables/sorting.ts";

const props = defineProps(["colNames", "items"]);
const emit = defineEmits(["onSelect", "onSort"]);

const SORTING_TYPES = {
  ASC: "ASC",
  DESC: "DESC",
};

const selectedItems = ref([]);
const sortHandler = function ({ sortType, col }) {
  let sortedItems = [];

  if (col === "Size") {
    sortedItems = sortDataSize(props.items, sortType);
  } else {
    const key = Object.keys(props.colNames).find(
      (k) => props.colNames[k] === col
    );

    sortedItems = props.items.sort((a, b) => {
      if (sortType === SORTING_TYPES.ASC) {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
  }

  emit("onSort", sortedItems);
};

watch(
  () => props.items,
  (newValue) => {
    selectedItems.value = props.items.filter((item) => item.checked);
    emit("onSelect", selectedItems);
  },
  { deep: true }
);
</script>

<template>
  <div class="c-table">
    <TableHeader @onSort="sortHandler($event)" :cols="colNames" />
    <div
      :style="{
        gridTemplateColumns: `repeat(${Object.keys(colNames).length}, 1fr)`,
      }"
      class="table-content"
    >
      <template v-for="item in items" :key="item.id">
        <TableItem :colNames="colNames" :item="item" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-content {
  display: grid;
  gap: 0 2rem;
  .table-content-item {
  }
}
</style>

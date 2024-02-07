<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  colNames: {
    type: Object,
    required: true,
  },
});

const columns = Object.keys(props.colNames);

watch(
  () => props.item.checked,
  (newValue) => {
    props.item.checked = newValue;
  },
  { deep: true }
);
</script>

<template>
  <div
    v-for="(col, index) in columns"
    class="table-content-item whitespace-nowrap"
  >
    <template v-if="index === 0">
      <input
        v-model="item.checked"
        type="checkbox"
        name="selected"
        id="selected"
        class="mr-4"
      />
      {{ item[col] }}
    </template>
    <template v-else>
      <span>{{ item[col] }}</span>
    </template>
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
import { ref } from "vue";

const dialog = ref(null);

type TContent = String | Object | Array<String>;

const props = defineProps({
  content: {
    type: Object as () => TContent,
    default: "",
  },
});

const emit = defineEmits(["onClose"]);

const showDialog = () => {
  if (!dialog.value) return;
  (dialog.value as HTMLDialogElement).showModal();
};

const closeDialog = () => {
  if (!dialog.value) return;
  (dialog.value as HTMLDialogElement).close();
  emit("onClose");
};

defineExpose({
  showDialog,
  closeDialog,
});
</script>

<template>
  <dialog ref="dialog" class="w-full max-w-[50dvw] p-5">
    <div class="m-3 flex justify-center font-bold mb-5 uppercase">To Send</div>
    <div class="mb-5">
      <div v-for="c in content">
        <pre>{{ JSON.stringify(c, null, 2) }} </pre>
      </div>
    </div>
    <div class="flex justify-end">
      <button @click="closeDialog">Close</button>
    </div>
  </dialog>
</template>

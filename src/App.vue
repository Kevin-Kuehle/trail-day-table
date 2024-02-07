<script setup lang="ts">
import { getDownloadsApi } from "./api-client/downloadsService";
import { Table, Dialog } from "./components";
import { ref, Ref } from "vue";

type TDownload = {
  name: string;
  category: string;
  type: string;
  size: string;
  checked: boolean;
};

type TResponse = {
  downloads: TDownload[];
};

const colNames = {
  name: "Name",
  category: "Kategorie",
  type: "Type",
  size: "Size",
};
let items = ref([]);

const validateAndSanitize = (downloads: TDownload[]) => {
  return downloads.map((download: TDownload) => {
    return {
      name: download.name,
      category: download.category,
      type: download.type,
      size: download.size,
      checked: false,
    };
  });
};

const selectedItems: Ref<TDownload[]> = ref([]);
const selectHandler = (v: Ref<TDownload[]>) => {
  selectedItems.value = v.value;
};

const dialog = ref(null);
const sendHandler = () => {
  // open dialog here
  dialog.value.showDialog();
};

const showError = (message: String) => {
  console.error(message);
};

getDownloadsApi().then(async (response: TResponse) => {
  try {
    if (response && response.downloads) {
      const sanitizedData = validateAndSanitize(response.downloads);
      items.value = sanitizedData;
    } else {
      showError("Failed to fetch data. Please try again later.");
    }
  } catch (error) {
    console.error("API call failed:", error);
  }
});

const table = ref(null);
const closeHandler = () => {
  if (!dialog.value) return;

  items.value.forEach((item: TDownload) => {
    item.checked = false;
  });
};
</script>

<template>
  <div class="container px-4 py-10">
    <Dialog ref="dialog" :content="selectedItems" @onClose="closeHandler" />
    <h2 class="text-3xl mb-6">Downloads</h2>
    <Table
      ref="table"
      :col-names="colNames"
      :items="items"
      @onSelect="selectHandler"
    />
    <button
      @click="sendHandler"
      :disabled="selectedItems.length === 0"
      class="my-4 w-full"
    >
      Senden
    </button>
  </div>
</template>

<style scoped lang="scss">
button:disabled {
  cursor: not-allowed;
  color: #666;
  opacity: 0.6;
}
</style>

import { defineStore } from "pinia";
import type { PaginationMetaDto } from "~/client";

export const usePageMetaStore = defineStore("pageMeta", () => {
  let meta = ref<PaginationMetaDto | null>(null);

  function setMeta(payload: PaginationMetaDto | null) {
    meta.value = payload;
  }
  return { meta, setMeta };
});

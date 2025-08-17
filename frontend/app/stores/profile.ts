import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", async () => {
  let profileInfo = ref();

  return { profileInfo };
});

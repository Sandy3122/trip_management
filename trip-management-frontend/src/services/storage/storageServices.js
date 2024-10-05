import { Storage } from "./index";


class StorageService {
    async getStorage(key) {
      try {
        const value = Storage.getItem(key);
        if (value) return JSON.parse(value);
        return null;
      } catch (err) {
        console.error("Error getting storage item:", err);
        return null;
      }
    }
  
    async setStorage(key, value) {
      try {
        await Storage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error("Error setting storage item:", err);
      }
    }
  
    clearStorage() {
      Storage.clear();
    }
  
    removeStorage(key) {
      Storage.removeItem(key);
    }
  
    removeStoredKeys() {
      const keysToRemove = [
        "isSuperAdmin",
        "accessToken",
        "isSidePanelCollapsed",
        "user",
        "lang",
        "userRoles",
        "updatedProfileInfo",
        "programDetails",
        "isEntityDeleted",
        "noneLocationListSet",
        "noAssignedBadgesSelected",
        "programTabsOpen",
        "qpfilterList"
      ];
  
      keysToRemove.forEach(key => Storage.removeItem(key));
    }
  }
  
  const storage = new StorageService();
  export { storage as LocalStorage };

  
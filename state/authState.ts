import { atom } from "recoil";
import { AuthData } from "../types";
import { DefaultValue } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet, resetSelf }: any) => {
    if (typeof window === "undefined") {
      resetSelf();
      return;
    }
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
      if (typeof window === "undefined") return;
      if (newValue === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const authState = atom({
  key: "AuthData",
  default: undefined as AuthData | undefined,
  effects: [localStorageEffect("auth-data")],
});

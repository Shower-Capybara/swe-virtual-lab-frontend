import { User } from "@/types";
import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ConfigsStoreState = {
  user: User | null;
};

export type ConfigsStoreActions = {
  setUser: (user: User | null) => void;
};

export type ConfigsStore = ConfigsStoreState & ConfigsStoreActions;

const defaultInitState: ConfigsStoreState = {
  user: null,
};

export const initConfigsStore = (): ConfigsStoreState => {
  return { ...defaultInitState };
};

export const createConfigsStore = (
  initState: ConfigsStoreState = defaultInitState
) => {
  return createStore<ConfigsStore>()(
    immer((set) => ({
      ...initState,
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
    }))
  );
};

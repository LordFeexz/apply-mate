import type { GenerateProfileAttributes } from "@/models/generate_profile";
import { create } from "zustand";

export interface InitialState {
  data: GenerateProfileAttributes | null;
}

export interface InitialAction {
  setData: (data: GenerateProfileAttributes | null) => void;
}

const useSharedStore = create<InitialState & InitialAction>((set) => ({
  data: null,
  setData: (data) => set((prev) => ({ ...prev, data })),
}));

export default useSharedStore;

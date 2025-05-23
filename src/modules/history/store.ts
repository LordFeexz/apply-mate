import { create } from "zustand";

export interface InitialState {
  page: number;
  limit: number;
  q: string;
  sort: string;
  type: string;
}

export interface InitialAction {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setQ: (q: string) => void;
  setSort: (sort: string) => void;
  setType: (type: string) => void;
}

const useHistoryParams = create<InitialState & InitialAction>((set) => ({
  page: 1,
  limit: 9,
  q: "",
  sort: "",
  type: "",
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
  setQ: (q: string) => set({ q }),
  setSort: (sort: string) => set({ sort }),
  setType: (type: string) => set({ type }),
}));

export default useHistoryParams;

import { create } from "zustand";

export interface InitialState {
  content: string;
  linkDialog: boolean;
  linkText: string;
  linkUrl: string;
  selectionRange: {
    start: number;
    end: number;
  } | null;
}

export interface InitialAction {
  setContent: (content: string) => void;
  setLinkDialog: (val: boolean) => void;
  setLinkText: (link: string) => void;
  setLinkUrl: (url: string) => void;
  setSelectionRange: (
    range: {
      start: number;
      end: number;
    } | null
  ) => void;
}

const useGeneratedCV = create<InitialState & InitialAction>((set) => ({
  content: "",
  setContent: (content) => set((prev) => ({ ...prev, content })),
  linkDialog: false,
  setLinkDialog: (openLinkDialog) =>
    set((prev) => ({ ...prev, openLinkDialog })),
  linkText: "",
  setLinkText: (linkText) => set((prev) => ({ ...prev, linkText })),
  linkUrl: "",
  setLinkUrl: (linkUrl) => set((prev) => ({ ...prev, linkUrl })),
  selectionRange: null,
  setSelectionRange: (selectionRange) =>
    set((prev) => ({ ...prev, selectionRange })),
}));

export default useGeneratedCV;

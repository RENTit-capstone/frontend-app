import { create } from "zustand";

type BottomSheetlType = "dateSelector" | "imagePicker" | "confirmDialog";

interface BottomSheetState {
    visible: boolean;
    type: BottomSheetState | null;
    props: any;
    open: (type: BottomSheetState, props?: any) => void;
    close: () => void;
}

const useBottomSheetStore = create<BottomSheetState>((set) => ({
    visible: false,
    type: null,
    props: null,
    open: (type, props = {}) => set({ visible: true, type, props }),
    close: () => set({ visible: false, type: null, props: null }),
}));

export default useBottomSheetStore;

import { create } from "zustand";

// export type BottomSheetScreenType = "dateSelector" | "policy" | "otp" | "priceSelector";

type BottomSheetType = {
    visible: boolean;
    bottomSheetScreenType: BottomSheetScreenType | null;
    bottomSheetProps?: any;
    resolve?: (result: any) => void;

    openBottomSheet: (type: BottomSheetScreenType, props?: any) => Promise<any> | void;
    closeBottomSheet: (result?: any) => void;
};

// export const useBottomSheetStore = create<BottomSheetType>((set, get) => ({
    visible: false,
    bottomSheetScreenType: null,
    bottomSheetProps: undefined,
    resolve: undefined,

    openBottomSheet: (type, props) => {
        const needResult = type !== "otp"; // 결과 필요한 모달만 Promise 리턴
        if (needResult) {
            return new Promise((resolve) => {
            set({ visible: true, bottomSheetScreenType: type, bottomSheetProps: props, resolve });
            });
        } else {
            set({ visible: true, bottomSheetScreenType: type, bottomSheetProps: props, resolve: undefined });
        }
    },

    closeBottomSheet: (result) => {
        const { resolve } = get();
        resolve?.(result);
        set({ visible: false, bottomSheetScreenType: null, bottomSheetProps: undefined, resolve: undefined });
  },
}));

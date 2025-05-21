import { resolvePlugin } from "@babel/core";
import { create } from "zustand";

type BottomSheetType = {
    visible: boolean;
    result: any;
    resolve?: (result: any) => void;
    prevCallback?: () => void;
    nextCallback?: () => void;

    openBottomSheet: (props?: any) => Promise<any> | void;
    cancelResult: () => void;
    submitResult: () => void;
    onPrev: (callback: () => void) => void;
    onNext: (callback: () => void) => void;
    setResult: (result: any) => void;
};

export const useBottomSheetStore = create<BottomSheetType>(
    (set, get) => ({
        visible: false,
        result: null,

        openBottomSheet: (props) => {
            return new Promise((resolve) => {
                set({ visible: true, resolve });
            });
        },

        cancelResult: () => {
            const {resolve} = get();
            if (resolve)    resolve({result: undefined});

            set({ visible: false, result: undefined, resolve: undefined});
        },
        submitResult: () => {
            const {result, resolve} = get();
            if (resolve)    resolve({result});

            set({ visible: false, result: undefined, resolve: undefined});
        },
        
        onPrev: (callback) => set({prevCallback: callback}),
        onNext: (callback) => set({nextCallback: callback}),

        setResult: (result) => set({result: result}),
}));

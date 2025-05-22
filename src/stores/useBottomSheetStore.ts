import { create } from "zustand";

type ResultType = {
    none: null;
    dateSelector: { startDate: string | null; endDate: string | null };
    policy: { flawPolicy: boolean, damagePolicy: boolean };
};

type BottomSheetType = {
    visible: boolean;
    type: keyof ResultType;
    result: any;
    resolve?: (result: any) => void;
    prevCallback?: () => void;
    nextCallback?: () => void;

    openBottomSheet: <T extends keyof ResultType> (
        type:  T
    ) => Promise<{result: ResultType[T]}>;
    cancelResult: () => void;
    submitResult: () => void;
    onPrev: (callback: () => void) => void;
    onNext: (callback: () => void) => void;
    setResult: (result: any) => void;
};

export const useBottomSheetStore = create<BottomSheetType>(
    (set, get) => ({
        visible: false,
        type: "none",
        result: null,

        openBottomSheet: (type) => {
            return new Promise((resolve) => {
                set({ visible: true, type: type, resolve });
            });
        },

        cancelResult: () => {
            const {result, resolve} = get();
            if (resolve)    resolve({result});

            set({ visible: false, result: undefined, resolve: undefined});
        },
        submitResult: () => {
            const {result, resolve} = get();
            if (resolve)    resolve({result});

            set({ visible: false, result: undefined, resolve: undefined});
        },
        
        onPrev: (callback) => set({prevCallback: callback}),
        onNext: (callback) => set({nextCallback: callback}),

        setResult: (result) => {console.log(result); set({result: result})},
}));

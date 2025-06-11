import { create } from 'zustand';

type ResultType = {
    none: void;
    dateSelector: {
        selectableStartDate: Date | null;
        selectableEndDate: Date | null;
        startDate: Date | null;
        endDate: Date | null;
    };
    policy: { damagedDescriptionPolicy: boolean; damagePolicy: boolean; returnPolicy: boolean };
    otp: void;
    priceSelector: { maxPrice: string; minPrice: string };
    returnImage: { key: string };
};

type BottomSheetType = {
    visible: boolean;
    type: keyof ResultType;
    result: any;
    resolve?: (result: any) => void;
    prevCallback?: () => void;
    nextCallback?: () => void;

    openBottomSheet: <T extends keyof ResultType>(
        type: T,
        initialResult?: ResultType[T],
    ) => Promise<{ result: ResultType[T] }>;

    cancelResult: () => void;
    submitResult: () => void;
    onPrev: (callback: () => void) => void;
    onNext: (callback: () => void) => void;
    setResult: (result: any) => void;
    clearCallbacks: () => void;
};

export const useBottomSheetStore = create<BottomSheetType>((set, get) => ({
    visible: false,
    type: 'none',
    result: null,

    openBottomSheet: (type, initialResult) => {
        return new Promise((resolve) => {
            set({
                visible: true,
                type,
                result: initialResult ?? null,
                resolve,
            });
        });
    },

    cancelResult: () => {
        const { result, resolve } = get();
        if (resolve) resolve({ result });

        set({ visible: false, result: undefined, resolve: undefined });
    },
    submitResult: () => {
        const { result, resolve } = get();
        if (resolve) resolve({ result });

        set({ visible: false, result: undefined, resolve: undefined });
    },

    onPrev: (callback) => set({ prevCallback: callback }),
    onNext: (callback) => set({ nextCallback: callback }),

    setResult: (result) => {
        console.log('result', result);
        set({ result: result });
    },
    clearCallbacks: () => set({ prevCallback: undefined, nextCallback: undefined }),
}));

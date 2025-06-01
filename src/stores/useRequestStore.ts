import { create } from 'zustand';

export type RequestPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

type RequestType = {
    phase: RequestPhaseType;
    startDate: Date | null;
    endDate: Date | null;

    policyChecked: boolean;
    itemData: {
        damagePolicy: string;
        returnPolicy: string;
        damagedDescription: string;
        price: number;
    };

    setPhase: (nextPhase: RequestPhaseType) => void;
    setStartDate: (startDate: Date | null) => void;
    setEndDate: (endDate: Date | null) => void;
    setPolicyChecked: (checked: boolean) => void;
    setItemData: (
        type: 'damagedDescription' | 'returnPolicy' | 'damagePolicy' | 'price',
        text: string | number,
    ) => void;
    clearRecord: () => void;
};

const useRequestStore = create<RequestType>()((set, get) => ({
    phase: 'viewing',
    startDate: null,
    endDate: null,

    policyChecked: false,
    itemData: {
        damagePolicy: '',
        returnPolicy: '',
        damagedDescription: '',
        price: 0,
    },
    setPhase: (nextPhase) => set({ phase: nextPhase }),
    setStartDate: (startDate) => set({ startDate: startDate ? new Date(startDate) : null }),
    setEndDate: (endDate) => set({ endDate: endDate ? new Date(endDate) : null }),

    setPolicyChecked: (checked) => set({ policyChecked: checked }),
    setItemData: (type, text) =>
        set((state) => ({
            itemData: {
                ...state.itemData,
                [type]: text,
            },
        })),

    clearRecord: () =>
        set({
            phase: 'viewing',
            startDate: null,
            endDate: null,
            policyChecked: false,
            itemData: {
                damagePolicy: '',
                returnPolicy: '',
                damagedDescription: '',
                price: 0,
            },
        }),
}));

export default useRequestStore;

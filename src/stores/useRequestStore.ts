import { create } from 'zustand';

export type RequestPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

type RequestType = {
    phase: RequestPhaseType;
    name: string | null;
    price: number | null;
    startDate: Date | null;
    endDate: Date | null;

    policyChecked: boolean;
    itemData: {
        damagePolicy: string;
        returnPolicy: string;
        damagedDescription: string;
        price: number;
        startDate: string;
        endDate: string;
    };

    setPhase: (nextPhase: RequestPhaseType) => void;
    setName: (name: string | null) => void;
    setPrice: (price: number | null) => void;
    setStartDate: (startDate: Date | null) => void;
    setEndDate: (endDate: Date | null) => void;
    setPolicyChecked: (checked: boolean) => void;
    setItemData: (
        type:
            | 'damagedDescription'
            | 'returnPolicy'
            | 'damagePolicy'
            | 'price'
            | 'startDate'
            | 'endDate',
        text: string | number,
    ) => void;
    clearRecord: () => void;
    claerData: () => void;
};

const useRequestStore = create<RequestType>()((set, get) => ({
    phase: 'viewing' as const,
    name: null,
    price: null,
    startDate: null,
    endDate: null,

    policyChecked: false,
    itemData: {
        damagePolicy: '',
        returnPolicy: '',
        damagedDescription: '',
        price: 0,
        startDate: '',
        endDate: '',
    },
    setPhase: (nextPhase) => set({ phase: nextPhase }),
    setName: (name) => set({ name }),
    setPrice: (price) => set({ price: price ? Number(price) : null }),

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
        }),
    claerData: () =>
        set({
            itemData: {
                damagePolicy: '',
                returnPolicy: '',
                damagedDescription: '',
                price: 0,
                startDate: '',
                endDate: '',
            },
        }),
}));

export default useRequestStore;

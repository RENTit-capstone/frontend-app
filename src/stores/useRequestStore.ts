import { create } from 'zustand';

export type RequestPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

type RequestType = {
    phase: RequestPhaseType;
    startDate: Date | null;
    endDate: Date | null;

    policyChecked: boolean;
    policyTexts: {
        damagePolicy: string;
        returnPolicy: string;
        damagedDescription: string;
    };

    setPhase: (nextPhase: RequestPhaseType) => void;
    setStartDate: (startDate: Date | null) => void;
    setEndDate: (endDate: Date | null) => void;
    setPolicyChecked: (checked: boolean) => void;
    setPolicyText: (
        type: 'damagedDescription' | 'returnPolicy' | 'damagePolicy',
        text: string,
    ) => void;
    clearRecord: () => void;
};

const useRequestStore = create<RequestType>()((set, get) => ({
    phase: 'viewing',
    startDate: null,
    endDate: null,

    policyChecked: false,
    policyTexts: {
        damagePolicy: '',
        returnPolicy: '',
        damagedDescription: '',
    },
    setPhase: (nextPhase) => set({ phase: nextPhase }),
    setStartDate: (startDate) => set({ startDate: startDate ? new Date(startDate) : null }),
    setEndDate: (endDate) => set({ endDate: endDate ? new Date(endDate) : null }),

    setPolicyChecked: (checked) => set({ policyChecked: checked }),
    setPolicyText: (type, text) =>
        set((state) => ({
            policyTexts: {
                ...state.policyTexts,
                [type]: text,
            },
        })),

    clearRecord: () =>
        set({
            phase: 'viewing',
            startDate: null,
            endDate: null,
            policyChecked: false,
            policyTexts: {
                damagePolicy: '',
                returnPolicy: '',
                damagedDescription: '',
            },
        }),
}));

export default useRequestStore;

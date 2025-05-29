import { create } from 'zustand';

export type RequestPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

type RequestType = {
    phase: RequestPhaseType;
    // storedId: string | string[] | undefined,
    startDate: Date | null;
    endDate: Date | null;

    flawPolicyChecked: boolean;
    damagePolicyChecked: boolean;
    returnPolicyChecked: boolean;

    userFlawPolicy: string;
    userReturnPolicy: string;

    setPhase: (nextPhase: RequestPhaseType) => void;
    // setStoredId: (storedId: string | string[]) => void,
    setStartDate: (startDate: string | null) => void;
    setEndDate: (endDate: string | null) => void;

    setFlawPolicy: (flawPolicy: string) => void;
    setReturnPolicy: (returnPolicy: string) => void;

    setFlawPolicyChecked: (checked: boolean) => void;
    setDamagePolicyChecked: (checked: boolean) => void;
    setReturnPolicyCHecked: (checked: boolean) => void;

    clearRecord: () => void;
};

const useRequestStore = create<RequestType>()((set, get) => ({
    phase: 'viewing',
    // storedId: undefined,
    startDate: null,
    endDate: null,

    flawPolicyChecked: false,
    damagePolicyChecked: false,
    returnPolicyChecked: false,

    userFlawPolicy: '',
    userReturnPolicy: '',

    setPhase: (nextPhase) => set({ phase: nextPhase }),
    // setStoredId: (storedId) => set({ storedId }),
    setStartDate: (startDate) => startDate && set({ startDate: new Date(startDate) }),
    setEndDate: (endDate) => endDate && set({ endDate: new Date(endDate) }),

    setFlawPolicy: (flawPolicy) => set({ userFlawPolicy: flawPolicy }),
    setReturnPolicy: (returnPolicy) => set({ userReturnPolicy: returnPolicy }),

    setFlawPolicyChecked: (checked) => set({ flawPolicyChecked: checked }),
    setDamagePolicyChecked: (checked) => set({ damagePolicyChecked: checked }),
    setReturnPolicyCHecked: (checked) => set({ returnPolicyChecked: checked }),

    clearRecord: () =>
        set({
            phase: 'viewing',
            startDate: undefined,
            endDate: undefined,
            flawPolicyChecked: false,
            damagePolicyChecked: false,
        }),
}));

export default useRequestStore;

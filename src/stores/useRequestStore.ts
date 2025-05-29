import { create } from 'zustand';

export type RequestPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

type RequestType = {
    phase: RequestPhaseType;
    startDate: Date | null;
    endDate: Date | null;

    damagedDescriptionPolicyChecked: boolean;
    damagedPolicyChecked: boolean;
    returnPolicyChecked: boolean;

    userDamagedDescriptionPolicy: string;
    userReturnPolicy: string;

    setPhase: (nextPhase: RequestPhaseType) => void;
    setStartDate: (startDate: string | null) => void;
    setEndDate: (endDate: string | null) => void;

    setDamagedDescriptionPolicy: (damagedDescriptionPolicy: string) => void;
    setReturnPolicy: (returnPolicy: string) => void;

    setDamagedDescriptionPolicyChecked: (checked: boolean) => void;
    setDamagedPolicyChecked: (checked: boolean) => void;
    setReturnPolicyChecked: (checked: boolean) => void;

    clearRecord: () => void;
};

const useRequestStore = create<RequestType>()((set, get) => ({
    phase: 'viewing',
    startDate: null,
    endDate: null,

    damagedDescriptionPolicyChecked: false,
    damagedPolicyChecked: false,
    returnPolicyChecked: false,

    userDamagedDescriptionPolicy: '',
    userReturnPolicy: '',

    setPhase: (nextPhase) => set({ phase: nextPhase }),
    setStartDate: (startDate) => set({ startDate: startDate ? new Date(startDate) : null }),
    setEndDate: (endDate) => set({ endDate: endDate ? new Date(endDate) : null }),

    setDamagedDescriptionPolicy: (damagedDescriptionPolicy) =>
        set({ userDamagedDescriptionPolicy: damagedDescriptionPolicy }),
    setReturnPolicy: (returnPolicy) => set({ userReturnPolicy: returnPolicy }),

    setDamagedDescriptionPolicyChecked: (checked) =>
        set({ damagedDescriptionPolicyChecked: checked }),
    setDamagedPolicyChecked: (checked) => set({ damagedPolicyChecked: checked }),
    setReturnPolicyChecked: (checked) => set({ returnPolicyChecked: checked }),

    clearRecord: () =>
        set({
            phase: 'viewing',
            startDate: null,
            endDate: null,
            damagedDescriptionPolicyChecked: false,
            damagedPolicyChecked: false,
            returnPolicyChecked: false,
            userDamagedDescriptionPolicy: '',
            userReturnPolicy: '',
        }),
}));

export default useRequestStore;

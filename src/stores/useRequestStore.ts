import { create } from "zustand"

export type RequestPhaseType = "viewing" | "dateSelecting" | "policyConsenting" | "applying";

type RequestType = {
    phase: RequestPhaseType,
    // storedId: string | string[] | undefined,
    startDate: Date | null,
    endDate: Date | null,
    flawPolicyChecked: boolean,
    damagePolicyChecked: boolean,
    setPhase: (nextPhase: RequestPhaseType) => void,
    // setStoredId: (storedId: string | string[]) => void,
    setStartDate: (startDate: string | null) => void,
    setEndDate: (endDate: string | null) => void,
    setFlawPolicyChecked: (checked: boolean) => void,
    setDamagePolicyChecked: (checked: boolean) => void,
    clearRecord: () => void,
}

const useRequestStore = create<RequestType>()(
    (set, get) => ({
        phase: "viewing", 
        // storedId: undefined,
        startDate: null,
        endDate: null,
        flawPolicyChecked: false,
        damagePolicyChecked: false,

        setPhase: (nextPhase) => set({ phase: nextPhase }),
        // setStoredId: (storedId) => set({ storedId }),
        setStartDate: (startDate) => startDate && set({ startDate: new Date(startDate) }),
        setEndDate: (endDate) => endDate && set({ endDate: new Date(endDate) }),
        setFlawPolicyChecked: (checked) => set({ flawPolicyChecked: checked }),
        setDamagePolicyChecked: (checked) => set({ damagePolicyChecked: checked }),
        clearRecord: () => set({phase: "viewing", startDate: undefined, endDate: undefined, flawPolicyChecked: false, damagePolicyChecked: false}),
    })
)

export default useRequestStore;
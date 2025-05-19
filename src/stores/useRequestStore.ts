import { create } from "zustand"

export type RequestPhaseType = "viewing" | "requesting" | "applying";

type RequestType = {
    phase: RequestPhaseType,
    // storedId: string | string[] | undefined,
    startDate: string | undefined,
    endDate: string | undefined,
    checked: boolean | undefined,
    setPhase: (nextPhase: RequestPhaseType) => void,
    // setStoredId: (storedId: string | string[]) => void,
    setStartDate: (startDate: string | null) => void,
    setEndDate: (endDate: string | null) => void,
    setChecked: (checked: boolean) => void,
    clearRecord: () => void,
}

const useRequestStore = create<RequestType>()(
    (set, get) => ({
        phase: "viewing", 
        // storedId: undefined,
        startDate: undefined,
        endDate: undefined,
        checked: undefined,
        setPhase: (nextPhase) => set({ phase: nextPhase }),
        // setStoredId: (storedId) => set({ storedId }),
        setStartDate: (startDate) => set({ startDate }),
        setEndDate: (endDate) => set({ endDate }),
        setChecked: (checked) => set({ checked }),
        clearRecord: () => set({startDate: undefined, endDate: undefined, checked: undefined}),
    })
)

export default useRequestStore;
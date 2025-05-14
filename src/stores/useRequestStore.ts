import { create } from "zustand"

export type RequestPhaseType = "viewing" | "periodSetting" | "consenting" | "applying";

type RequestType = {
    phase: RequestPhaseType,
    storedId: string | string[] | undefined,
    // openCalendar: boolean,
    startDate: string | undefined,
    endDate: string | undefined,
    checked: boolean | undefined,
    // setOpenCalendar: (openCalendar: boolean) => void,
    setPhase: (nextPhase: RequestPhaseType) => void,
    setStoredId: (storedId: string | string[]) => void,
    setStartDate: (startDate: string) => void,
    setEndDate: (endDate: string) => void,
    setChecked: (checked: boolean) => void,
    clearRecord: () => void,
}

const useRequestStore = create<RequestType>()(
    (set, get) => ({
        phase: "viewing", 
        storedId: undefined,
        // openCalendar: false,
        startDate: undefined,
        endDate: undefined,
        checked: undefined,
        // setOpenCalendar: (openCalendar) => set({ openCalendar: !openCalendar }),
        setPhase: (nextPhase) => set({ phase: nextPhase }), // 추후 nextPhase로 개선
        setStoredId: (storedId) => set({ storedId }),
        setStartDate: (startDate) => set({ startDate }),
        setEndDate: (endDate) => set({ endDate }),
        setChecked: (checked) => set({ checked }),
        clearRecord: () => set({storedId: undefined, startDate: undefined, endDate: undefined, checked: undefined}),
    })
)

export default useRequestStore;
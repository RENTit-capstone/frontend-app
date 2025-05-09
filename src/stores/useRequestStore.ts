import { create } from "zustand"

type RequestType = {
    itemId: number | undefined,
    startDate: string | undefined,
    endDate: string | undefined,
    approved: boolean | undefined,
    setStartDate: (startDate: string) => void,
    setEndDate: (endDate: string) => void,
}

const useRequestStore = create<RequestType>()(
    (set, get) => ({
        itemId: undefined,
        startDate: undefined,
        endDate: undefined,
        approved: undefined,
        setStartDate: (startDate) => set({ startDate }),
        setEndDate: (endDate) => set({ endDate }),
    })
)

export default useRequestStore;
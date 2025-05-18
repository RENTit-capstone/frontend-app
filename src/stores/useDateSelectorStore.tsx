import { create } from "zustand";

type DateSelectorState = {
    visible: boolean,
    startDate: string | null,
    endDate: string | null,
    resolve?: (result: {startDate: string | null; endDate: string | null}) => void;

    openDateSelector: () => Promise<{ startDate: string | null; endDate: string | null}>;
    closeDateSelector: (close: boolean) => void;
    setStartDate: (date: string | null) => void;
    setEndDate: (date: string | null) => void;
}

const useDateSelectorStore = create<DateSelectorState>(
    (set, get) => ({
        visible: false,
        startDate: null,
        endDate: null,

        openDateSelector: () => {
            return new Promise((resolve) => {
                set({ visible: true, resolve });                
            });
        },
        closeDateSelector: (close) => {
            const { startDate, endDate, resolve } = get();
            if (close && resolve) {
                resolve({ startDate, endDate });
            }
            else if (resolve) {
                resolve({ startDate: null, endDate: null });
            }
            set({ visible: false, startDate: null, endDate: null, resolve: undefined });
        },

        setStartDate: (date) => set({ startDate: date }),
        setEndDate: (date) => set({ endDate: date }),
    })
)
export default useDateSelectorStore;
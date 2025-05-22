import { create } from "zustand";

type DateSelectorState = {
    visible: boolean;
    startDate: string | null;
    endDate: string | null;
    resolve?: (result: {startDate: string | null; endDate: string | null}) => void;
    closeCallback?: () => void;

    openDateSelector: () => Promise<{ startDate: string | null; endDate: string | null}>;
    closeDateSelector: (close: boolean) => void;
    onCloseDateSelector: (callback: () => void) => void;
    setStartDate: (date: string | null) => void;
    setEndDate: (date: string | null) => void;
}

const useDateSelectorStore = create<DateSelectorState>(
    (set, get) => ({
        visible: false,
        startDate: null,
        endDate: null,
        closeCallback: undefined,

        openDateSelector: () => {
            return new Promise((resolve) => {
                set({ visible: true, resolve, closeCallback: undefined });                
            });
        },
        closeDateSelector: (close) => {
            const callback = get().closeCallback;
            const { startDate, endDate, resolve } = get();
            if (close && resolve) {
                resolve({ startDate, endDate });
            }
            else if (resolve) {
                resolve({ startDate: null, endDate: null });
            }
            set({ visible: false, startDate: null, endDate: null, resolve: undefined, closeCallback: undefined });
            callback?.();
        },
        onCloseDateSelector: (callback) => set({ closeCallback: callback }),

        setStartDate: (date) => set({ startDate: date }),
        setEndDate: (date) => set({ endDate: date }),
    })
)
export default useDateSelectorStore;
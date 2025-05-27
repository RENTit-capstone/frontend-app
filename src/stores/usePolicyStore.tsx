import { create } from 'zustand';

type PolicyState = {
    visible: boolean;
    flawPolicy: boolean | undefined;
    damagePolicy: boolean | undefined;
    resolve?: (result: {
        flawPolicy: boolean | undefined;
        damagePolicy: boolean | undefined;
    }) => void;

    openPolicy: () => Promise<{
        flawPolicy: boolean | undefined;
        damagePolicy: boolean | undefined;
    }>;
    closePolicy: (close: boolean) => void;
    setFlawPolicy: (agreed: boolean | undefined) => void;
    setDamagePolicy: (agreed: boolean | undefined) => void;
};

const usePolicyStore = create<PolicyState>((set, get) => ({
    visible: false,
    flawPolicy: false,
    damagePolicy: false,

    openPolicy: () => {
        return new Promise((resolve) => {
            set({ visible: true, resolve });
        });
    },
    closePolicy: (close) => {
        const { flawPolicy, damagePolicy, resolve } = get();
        if (close && resolve) {
            resolve({ flawPolicy, damagePolicy });
        } else if (resolve) {
            resolve({ flawPolicy: undefined, damagePolicy: undefined });
        }
        set({ visible: false, flawPolicy: undefined, damagePolicy: undefined, resolve: undefined });
    },

    setFlawPolicy: (agreed) => set({ flawPolicy: agreed }),
    setDamagePolicy: (agreed) => set({ damagePolicy: agreed }),
}));
export default usePolicyStore;

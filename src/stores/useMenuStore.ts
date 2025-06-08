import { create } from 'zustand';

type MenuItem = {
    label: string;
    onPress: () => void;
};

type MenuState = {
    menuItems: MenuItem[];
    setMenuItems: (items: MenuItem[]) => void;
};

export const useMenuStore = create<MenuState>((set) => ({
    menuItems: [],
    setMenuItems: (items) => set({ menuItems: items }),
}));

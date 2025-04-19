import { StyleSheet } from "react-native";

// export const Colors = {
//     primary: '#455464',
//     secondary: '#F4EDE1',
//     background: '#FFFFFF',
// };
  
// export const FontSizes = {
//     body: 16,
//     title: 24,
// };

const colorSystem = {
    primary: "#455464",
    secondary: "#F4EDE1",
    background: "#FFFFFF",    
    option: "#D3D3D7",
}

export const Themes = StyleSheet.create({
    primary: {
        backgroundColor: colorSystem.primary,
        color: colorSystem.secondary,
    },
    secondary: {
        backgroundColor: colorSystem.secondary,
        color: colorSystem.primary,
    },
    option: {
        color: colorSystem.option,
    }
});
import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");
const GUIDELINE_WIDTH =  414;       // iPhone11 기준

const normalizeSize = (size: number) => {
    const scale = width / GUIDELINE_WIDTH;
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export default normalizeSize;
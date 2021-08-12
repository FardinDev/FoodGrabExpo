import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#FE4040", //orange
    transparentPrimray: 'rgba(227, 120, 75, 0.4)',
    orange: "#FFA133",
    lightOrange: "#FFA133",
    lightOrange2: "#FDDED4",
    lightOrange3: '#FFD9AD',
    green: "#27AE60",
    red: "#FF1717",
    blue: '#0064C0',
    darkBlue: "#111A2C",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: '#CFD0D7',
    lightGray1: "#DDDDDD",
    lightGray2: "#F5F5F8",
    white2: "#FBFBFB",
    white: '#FFFFFF',
    black: "#000000",

    transparent: 'transparent',
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)",

    transparentWhite: "rgba(255,255,255, 0.7)"

};
export const SIZES = {
    // global sizes
    base: 8,
    font: 10,
    radius: 10,
    padding: 12,

    // font sizes
    largeTitle: 40,
    h1: 28,
    h2: 20,
    h3: 14,
    h4: 12,
    h5: 8,
    body1: 28,
    body2: 20,
    body3: 12,
    body4: 12,
    body5: 8,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "PoppinsBlack", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "PoppinsBold", fontSize: SIZES.h1, lineHeight: 32 },
    h2: { fontFamily: "PoppinsBold", fontSize: SIZES.h2, lineHeight: 26 },
    h3: { fontFamily: "PoppinsSemiBold", fontSize: SIZES.h3, lineHeight: 20 },
    h4: { fontFamily: "PoppinsSemiBold", fontSize: SIZES.h4, lineHeight: 20 },
    h5: { fontFamily: "PoppinsSemiBold", fontSize: SIZES.h5, lineHeight: 20 },
    body1: { fontFamily: "PoppinsRegular", fontSize: SIZES.body1, lineHeight: 34 },
    body2: { fontFamily: "PoppinsRegular", fontSize: SIZES.body2, lineHeight: 28 },
    body3: { fontFamily: "PoppinsRegular", fontSize: SIZES.body3, lineHeight: 20 },
    body4: { fontFamily: "PoppinsRegular", fontSize: SIZES.body4, lineHeight: 20 },
    body5: { fontFamily: "PoppinsRegular", fontSize: SIZES.body5, lineHeight: 20 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

export const themes = {
  dark: {
    background: "rgb(0, 0, 9)",
    primary: "black",
    secondary: "#111f28",
    color: "rgb(180, 180, 194)",
    contrast: "3",
  },
  light: {
    background: "beige",
    primary: "white",
    secondary: "grey",
    color: "black",
    contrast: "10",
  },
  black: {
    background: "black",
    primary: "black",
    secondary: "#111f28",
    color: "beige",
    contrast: "3",
  },
  red: {
    background: "black",
    primary: "black",
    secondary: "#281111",
    color: "white",
    contrast: "3",
  },
  orange: {
    background: "black",
    primary: "black",
    secondary: "orange",
    color: "white",
    contrast: "3",
  },
  gold: {
    background: "black",
    primary: "black",
    secondary: "goldenrod",
    color: "white",
    contrast: "3",
  },
  developers_favourite: {
    background: "black",
    primary: "rgb(0,0,0)",
    secondary: "rgb(66, 18, 18)",
    color: "white",
    contrast: "3",
  },
  rainbow: {
    background:
      "linear-gradient(to bottom right, red, orange, yellow, green, blue, purple, pink)",
    primary: "transparent",
    secondary: "transparent",
    color: "black",
    contrast: "3",
  },
};

export type ThemeType = keyof typeof themes;

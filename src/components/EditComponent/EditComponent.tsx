import React from 'react'
import Edit_Light_Image from "../../assets/light_theme/edit.png";
import Edit_Dark_Image from "../../assets/dark_theme/edit.png";
import { useTheme } from "../../context/ThemeContext.tsx";

export default function EditComponent() {

    const {theme} = useTheme();
    return (
        <>
            {/* <img src={Edit_Dark_Image} alt="" /> */}
            <img src={theme === "light" ? Edit_Light_Image : Edit_Dark_Image} alt="" />
        </>
    )
}

import type { ChangeEvent } from "react";
import type { IInputLabel } from "../Interfaces/InputLabel";

export default function InputLabel({label, placeholder, type, inputValue, handleChange}: IInputLabel){
    return <div className="inputlabel">
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <input type={type} name={label.toLowerCase()} id={label.toLowerCase()} placeholder={placeholder} value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}/>
    </div>
}
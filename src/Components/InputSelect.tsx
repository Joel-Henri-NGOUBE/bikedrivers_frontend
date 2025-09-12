import type { ChangeEvent } from "react";
import type { IInputSelect } from "../Interfaces/InputSelect";

export default function InputSelect({label, options, inputValue, handleChange}: IInputSelect){
    return <div className="inputselect">
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <select name={label.toLowerCase()} id={label.toLowerCase()} value={inputValue} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}>
            {options.map((op, index) => {
                return <option value={op} key={index}>{op}</option>})}
        </select>
    </div>
}
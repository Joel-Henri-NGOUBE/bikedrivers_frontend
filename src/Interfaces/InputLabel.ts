import type { ChangeEvent } from "react";

export interface IInputLabel{
    label: string,
    placeholder: string,
    type: string,
    inputValue: string,
    handleChange(event: ChangeEvent<HTMLInputElement>): void
}
import type { ChangeEvent } from "react";

export interface IInputSelect{
    label: string,
    options: string[],
    inputValue: string,
    handleChange(event: ChangeEvent<HTMLSelectElement>): void
}
import {validations} from "../types/types";

export interface inputWithLabelToTopInterface {
    id: number,
    name: string,
    text: string,
    type: 'text' | 'password',
    value: string,
    errorStatus: boolean,
    stringBeforeErrorMessage?: string,
    validationTypes: validations[]
}
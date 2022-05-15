export interface CustomFunctionItem {
  id?: number;
  title: string;
  subtitle: string;
  author: string;
  tags: string;
  inputs: FunctionInput[];
  function: string;
}

export interface FunctionInput {
  label: string;
  type: FunctionInputType;
  value: string;
  options?: string;
}

export enum FunctionInputType {
  TEXTAREA = "TEXTAREA",
  TEXTFIELD = "TEXTFIELD",
  NUMBER = "NUMBER",
  DATE = "DATE",
  TIME = "TIME",
  COLOR = "COLOR",
  YES_NO = "YES_NO",
  SELECT_OPTION = "SELECT_OPTION"
}

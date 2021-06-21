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
}

export enum FunctionInputType {
  TEXTAREA = "TEXTAREA",
  TEXTFIELD = "TEXTFIELD",
  NUMBER = "NUMBER",
  DATE = "DATE",
  YES_NO = "YES_NO"
}

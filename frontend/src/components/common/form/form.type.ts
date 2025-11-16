
export type InputValueType = string | Record<string,unknown>;
export interface FieldType {
    name:string;
    placeholder:string;
    optional:boolean;
    value:InputValueType;
    defaultValue:InputValueType;
    span:number;
    id:string;
    imgHeight:number;
    imageWidth:number;
    type:string;
    unique:boolean;
    title:string;
    minLength:number;
    maxLength:number;
    textAreaHeight:number;
    textLimit:number;
    order:number;
    edit:boolean;
}
export interface RowType{
   span:number;
   id:string;
   fields:FieldType[];
}
import * as yup from 'yup';
interface Item {
    id?: number;
    name: string;
    value: string;
}
export declare const schema: yup.ObjectSchema<yup.Shape<object, {
    id: number;
    name: string;
    value: string;
}>>;
export declare const validateItem: (obj: any) => Promise<Item>;
export default Item;

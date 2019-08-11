interface Item {
    id?: number;
    name: string;
    value: string;
}
export declare const validateItem: (obj: any) => Promise<Item>;
export default Item;

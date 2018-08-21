interface Item {
    id?: string;
    name: string;
    value: string;
}
export declare const validateItem: (obj: any) => Promise<Item>;
export default Item;

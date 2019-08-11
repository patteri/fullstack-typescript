import * as yup from 'yup';

interface Item {
  id?: number;
  name: string;
  value: string;
}

const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  value: yup.string().required(),
});

export const validateItem = (obj: any): Promise<Item> => schema.validate(obj);

export default Item;

import * as yup from 'yup';

interface Item {
  id?: number;
  name: string;
  value: string;
}

export const schema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required('Required'),
  value: yup.string().required('Required'),
});

export const validateItem = (obj: any): Promise<Item> => schema.validate(obj);

export default Item;

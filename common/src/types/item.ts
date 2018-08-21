import * as yup from 'yup';

interface Item {
  id?: string;
  name: string;
  value: string;
}

const schema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  value: yup.string().required(),
});

export const validateItem = (obj): Promise<Item> => schema.validate(obj);

export default Item;

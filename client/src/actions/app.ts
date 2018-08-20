export const CHANGE_NAME = 'CHANGE_NAME';
export type CHANGE_NAME = typeof CHANGE_NAME;

export const CHANGE_VALUE = 'CHANGE_VALUE';
export type CHANGE_VALUE = typeof CHANGE_VALUE;

export interface ChangeName {
  type: CHANGE_NAME;
  value: string;
}

export interface ChangeValue {
  type: CHANGE_VALUE;
  value: string;
}

export type AppAction = ChangeName | ChangeValue;

export function changeName(value: string): ChangeName {
  return {
    type: CHANGE_NAME,
    value,
  };
}

export function changeValue(value: string): ChangeValue {
  return {
    type: CHANGE_VALUE,
    value,
  };
}
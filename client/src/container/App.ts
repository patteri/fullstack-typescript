import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Item } from 'common';
import App from '../component/App';
import * as actions from '../actions/app';
import * as api from '../api/api';
import { AppReducerState } from '../reducers/app';

export function mapStateToProps({ name, value, items }: AppReducerState) {
  return {
    name,
    value,
    items,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AppAction>) {
  return {
    onNameChanged: (value: string) => dispatch(actions.changeName(value)),
    onValueChanged: (value: string) => dispatch(actions.changeValue(value)),
    fetchItems: () => api.getItems().then((r) => dispatch(actions.fetchItems(r.data))),
    addItem: (item: Item) => api.addItem(item).then((r) => dispatch(actions.fetchItems(r.data))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

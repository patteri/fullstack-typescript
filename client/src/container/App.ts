import App from '../component/App';
import * as actions from '../actions/app';
import { AppReducerState } from '../reducers/app';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export function mapStateToProps({ name, value }: AppReducerState) {
  return {
    name,
    value,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AppAction>) {
  return {
    onNameChanged: (value: string) => dispatch(actions.changeName(value)),
    onValueChanged: (value: string) => dispatch(actions.changeValue(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

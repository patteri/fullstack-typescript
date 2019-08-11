import React, { FormEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import padStart from 'lodash/padStart';
import { Item } from 'common';
import ItemTable from './ItemTable';
import * as actions from './actions';
import { AppReducerState } from './reducer';
import { RootState } from '../../reducers';
import logo from './logo.svg';
import './index.css';

interface DispatchProps {
  changeName(value: string): void;
  changeValue(value: string): void;
  fetchItems(): Promise<Item[]>;
  createItem(item: Item): Promise<Item>;
  removeItem(id: number): Promise<Item>;
}

interface State {
  time: Date;
}

type Props = AppReducerState & DispatchProps;

class App extends React.Component<Props, State> {
  private timer: any = undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      time: new Date(),
    };

    this.timer = setInterval(this.timeChanged, 1000);
  }

  public componentDidMount() {
    this.props.fetchItems();
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  private timeChanged = () => {
    this.setState({ time: new Date() });
  };

  private handleAddItem = (event: FormEvent) => {
    this.props.createItem({
      name: this.props.name,
      value: this.props.value,
    });

    event.preventDefault();
  };

  private removeItem = (item: Item) => {
    this.props.removeItem(item.id!);
  };

  private formatClock = (time: Date): string =>
    `${this.formatTimePart(time.getHours())}:${this.formatTimePart(time.getMinutes())}:${this.formatTimePart(
      time.getSeconds()
    )}`;

  private formatTimePart = (part: number) => padStart(part.toString(), 2, '0');

  render() {
    const { name, value, items, isLoading, changeName, changeValue } = this.props;
    const { time } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <p>
            <strong>Current time:</strong> {this.formatClock(time)}
          </p>
          <ItemTable isLoading={isLoading} items={items} removeItem={this.removeItem} />
          <form onSubmit={this.handleAddItem}>
            <label>Add new item</label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={name}
                placeholder="Name"
                onChange={e => changeName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={value}
                placeholder="Value"
                onChange={e => changeValue(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: RootState): AppReducerState => store.app;

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeName: value => dispatch(actions.changeName(value)),
  changeValue: value => dispatch(actions.changeValue(value)),
  fetchItems: () => actions.fetchItemsWorker(dispatch, {}),
  createItem: item => actions.createItemWorker(dispatch, item),
  removeItem: id => actions.removeItemWorker(dispatch, id),
});

export default connect<AppReducerState, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(App);

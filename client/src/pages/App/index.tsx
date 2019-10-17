import React, { FormEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import padStart from 'lodash/padStart';
import { Formik, Form, Field } from 'formik';
import { Item, itemSchema } from 'common';
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

  private addItem = (item: Item) => {
    this.props.createItem(item);
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

          <form id="classic-form" onSubmit={this.handleAddItem}>
            <p>Example of a "classic" React form</p>
            <label>Add new item</label>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={e => changeName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="value"
                value={value}
                placeholder="Value"
                onChange={e => changeValue(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>

          <Formik<Item>
            initialValues={{
              name: '',
              value: '',
            }}
            validationSchema={itemSchema}
            onSubmit={this.addItem}
          >
            {({ errors, touched }) => (
              <Form id="formik-form">
                <p>Example of a form utilizing formik and yup validations</p>
                <label>Add new item</label>
                <div className="form-group">
                  <Field className="form-control" name="name" placeholder="Name" />
                  {touched.name && errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <Field className="form-control" name="value" placeholder="Value" />
                  {touched.value && errors.value && <span className="error">{errors.value}</span>}
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </Form>
            )}
          </Formik>
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

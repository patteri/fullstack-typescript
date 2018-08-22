import * as React from 'react';
import { Item } from 'common';
import logo from '../logo.svg';

export interface Props {
  name: string;
  value: string;
  items: Item[];
  onNameChanged: (value: string) => void;
  onValueChanged: (value: string) => void;
  fetchItems: () => void;
  addItem: (item: Item) => void;
}

interface State {
  time: Date;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      time: new Date(),
    };

    setInterval(this.timeChanged, 1000);
  }

  public componentDidMount() {
    this.props.fetchItems();
  }

  private timeChanged = () => {
    this.setState({ time: new Date() });
  }

  private addItem = () => {
    this.props.addItem({
      name: this.props.name,
      value: this.props.value,
    });
  }

  public render() {
    const { name, value, items, onNameChanged, onValueChanged } = this.props;
    const { time } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <p>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</p>
          <ul className="list-unstyled">
            {items.map(item => (
              <li key={item.id}>{item.name}: {item.value}</li>
            ))}
          </ul>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={name}
              placeholder="Name"
              onChange={e => onNameChanged(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={value}
              placeholder="Value"
              onChange={e => onValueChanged(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={this.addItem}>Add</button>
        </div>
      </div>
    );
  }
}

export default App;

import * as React from 'react';
import logo from '../logo.svg';

export interface Props {
  name: string;
  value: string;
  onNameChanged: (value: string) => void;
  onValueChanged: (value: string) => void;
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

  private timeChanged = () => {
    this.setState({ time: new Date() });
  }

  public render() {
    const { name, value, onNameChanged, onValueChanged } = this.props;
    const { time } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <p>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</p>
          <div>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => onNameChanged(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={value}
              placeholder="Value"
              onChange={(e) => onValueChanged(e.target.value)}
            />
          </div>
        </p>
      </div>
    );
  }
}

export default App;

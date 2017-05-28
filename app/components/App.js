import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from './TimePicker';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: undefined,
    };
  }

  handleOnChange(event, time) {
    console.log('time', time);
    this.setState({ time });
  }

  render() {
    return (
      <MuiThemeProvider>
        <TimePicker
          onChange={(event, value) => this.handleOnChange(event, value)}
          value={Date.now()}
          zDepth={1}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;

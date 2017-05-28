import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from './TimePicker';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => {
  const date = Date.now();

  return (
    <div>
      <h3>Full</h3>
      <MuiThemeProvider>
        <TimePicker
          onChange={(event, value) => console.log('time', value)}
          value={date}
          zDepth={1}
        />
      </MuiThemeProvider>
      <h3>Mini</h3>
      <MuiThemeProvider>
        <TimePicker
          onChange={(event, value) => console.log('time', value)}
          value={date}
          zDepth={1}
          mini
        />
      </MuiThemeProvider>
    </div>
  );
};

export default App;

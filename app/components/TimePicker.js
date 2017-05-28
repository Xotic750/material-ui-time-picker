import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import uuid from 'uuid';
import moment from 'moment';
import PropTypeMomentParse from './prop-type-moment-parse';
import PropTypeIntegerRange from './prop-type-integer-range';
import HourPicker from './HourPicker';
import MinutePicker from './MinutePicker';

class TimePicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onTouchTap: PropTypes.func,
    onTouchTapButton: PropTypes.func,
    onFocus: PropTypes.func,
    style: PropTypes.shape({}),
    dialogBodyStyle: PropTypes.shape({}),
    dialogContentStyle: PropTypes.shape({}),
    titleHour: PropTypes.string,
    titleMinute: PropTypes.string,
    titleStyle: PropTypes.shape({}),
    textFieldStyle: PropTypes.shape({}),
    dialogStyle: PropTypes.shape({}),
    noPad: PropTypes.bool,
    zDepth: PropTypeIntegerRange(0, 5),
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    hintText: PropTypes.string,
    value: PropTypeMomentParse,
    mini: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    onChange: undefined,
    onTouchTap: undefined,
    onTouchTapButton: undefined,
    onFocus: undefined,
    style: undefined,
    dialogBodyStyle: undefined,
    dialogContentStyle: undefined,
    titleHour: undefined,
    titleMinute: undefined,
    titleStyle: undefined,
    textFieldStyle: undefined,
    dialogStyle: undefined,
    noPad: undefined,
    zDepth: undefined,
    cancelLabel: 'Cancel',
    okLabel: 'OK',
    hintText: '24hr Format',
    value: undefined,
    mini: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.shape({}).isRequired,
  };

  static createTextFieldValue(date) {
    const tmp = moment(date);
    return tmp.isValid() ? tmp.format('HH:mm') : '';
  }

  constructor(props) {
    super(props);
    Object.defineProperties(this, {
      instanceId: {
        value: uuid.v4(),
      },
      onCancel: {
        value: event => this.handleCancel(event),
      },
      onSubmit: {
        value: event => this.handleSubmit(event),
      },
      onFocusInput: {
        value: event => this.handleFocusInput(event),
      },
      onTouchTapInput: {
        value: event => this.handleTouchTapInput(event),
      },
      onTouchTapHour: {
        value: (event, value) =>
          this.handleOnTouchTapButton(event, 'hour', value),
      },
      onTouchTapMinute: {
        value: (event, value) =>
          this.handleOnTouchTapButton(event, 'minute', value),
      },
      onChangeHour: {
        value: (event, value) => this.handleOnChange(event, 'hour', value),
      },
      onChangeMinute: {
        value: (event, value) => this.handleOnChange(event, 'minute', value),
      },
    });

    const {
      value,
    } = this.props;

    const tmp = moment(isNil(value) ? NaN : value);
    const date = tmp.isValid() ? tmp : null;

    this.state = {
      open: false,
      hour: date && date.hour(),
      minute: date && date.minute(),
      date,
    };
  }

  getStyles() {
    const {
      disabled,
      mini,
    } = this.props;

    const width = mini ? 322 : 492;

    return {
      root: {
        opacity: disabled === true && '0.4',
      },
      content: {
        width,
      },
      body: {
        padding: 0,
        minHeight: mini ? 204 : 270,
        minWidth: width,
      },
    };
  }

  handleOnChange(event, key, value) {
    if (this.state[key] !== value) {
      this.setState({ [key]: value });
    }
  }

  handleOnTouchTapButton(event, key, value) {
    const {
      onTouchTapButton,
    } = this.props;

    if (onTouchTapButton) {
      onTouchTapButton(event, key, value);
    }
  }

  handleFocusInput(event) {
    event.target.blur();
    const {
      onFocus,
    } = this.props;

    if (onFocus) {
      onFocus(event);
    }
  }

  handleTouchTapInput(event) {
    event.preventDefault();

    const {
      disabled,
      onTouchTap,
    } = this.props;

    if (disabled === false) {
      this.setState({ open: true });
    }

    if (onTouchTap) {
      onTouchTap(event);
    }
  }

  handleCancel(/* event */) {
    this.setState({ open: false });
  }

  handleSubmit(event) {
    const {
      onChange,
    } = this.props;

    const {
      hour,
      minute,
    } = this.state;

    const date = moment();
    date.set({
      hour: isUndefined(hour) ? date.hour() : hour,
      minute: isUndefined(minute) ? date.minute() : minute,
      second: 0,
      millisecond: 0,
    });

    this.setState({ open: false, date });
    if (onChange) {
      onChange(event, date);
    }
  }

  render() {
    const {
      disabled,
      style,
      dialogBodyStyle,
      dialogContentStyle,
      titleHour,
      titleMinute,
      titleStyle,
      textFieldStyle,
      dialogStyle,
      zDepth,
      noPad,
      cancelLabel,
      okLabel,
      hintText,
      mini,
    } = this.props;

    const {
      open,
      hour,
      minute,
      date,
    } = this.state;

    const styles = this.getStyles();
    const textFieldValue = TimePicker.createTextFieldValue(date);

    const actions = [
      <FlatButton
        label={cancelLabel}
        primary
        onTouchTap={this.onCancel}
      />,
      <FlatButton
        label={okLabel}
        primary
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <div
        style={{ ...styles.root, ...style }}
      >
        <TextField
          id={this.instanceId}
          style={textFieldStyle}
          value={textFieldValue}
          hintText={hintText}
          onFocus={this.onFocusInput}
          onTouchTap={this.onTouchTapInput}
        />
        <Dialog
          style={dialogStyle}
          bodyStyle={{ ...styles.body, ...dialogBodyStyle }}
          contentStyle={{ ...styles.content, ...dialogContentStyle }}
          actions={actions}
          open={open}
          modal
        >
          <HourPicker
            disabled={disabled}
            title={titleHour}
            titleStyle={titleStyle}
            numberOfColumns={mini ? 6 : undefined}
            elementStep={undefined}
            onChange={this.onChangeHour}
            onTouchTapButton={this.onTouchTapButtonHour}
            zDepth={zDepth}
            noPad={noPad}
            value={hour}
          />
          <MinutePicker
            disabled={disabled}
            title={titleMinute}
            titleStyle={titleStyle}
            numberOfColumns={mini ? 3 : undefined}
            elementStep={mini ? 5 : undefined}
            onChange={this.onChangeMinute}
            onTouchTapButton={this.onTouchTapButtonMinute}
            zDepth={zDepth}
            noPad={noPad}
            value={minute}
          />
        </Dialog>
      </div>
    );
  }
}

export default TimePicker;

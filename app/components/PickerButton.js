import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'material-ui/styles/transitions';
import EnhancedButton from 'material-ui/internal/EnhancedButton';

class PickerButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    value: PropTypes.string,
    onKeyboardFocus: PropTypes.func,
    onTouchTap: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    selected: false,
    value: undefined,
    onKeyboardFocus: undefined,
    onTouchTap: undefined,
  };

  static contextTypes = {
    muiTheme: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    Object.defineProperties(this, {
      onKeyboardFocus: {
        value: (event, keyboardFocused) =>
          this.handleKeyboardFocus(event, keyboardFocused),
      },
      onMouseEnter: {
        value: event => this.handleMouseEnter(event),
      },
      onMouseLeave: {
        value: event => this.handleMouseLeave(event),
      },
      onTouchTap: {
        value: event => this.handleTouchTap(event),
      },
    });

    this.state = {
      hover: false,
    };
  }

  getStyles() {
    const {
      disabled,
      selected,
    } = this.props;

    const {
      baseTheme,
      datePicker,
    } = this.context.muiTheme;

    let labelColor = baseTheme.palette.textColor;
    let buttonStateOpacity = 0;
    let buttonStateTransform = 'scale(0)';

    if (this.state.hover || selected) {
      labelColor = datePicker.selectTextColor;
      buttonStateOpacity = selected ? 1 : 0.6;
      buttonStateTransform = 'scale(1)';
    }

    return {
      root: {
        boxSizing: 'border-box',
        fontWeight: '400',
        opacity: disabled === true && '0.4',
        padding: '4px 0px',
        position: 'relative',
        // Remove mobile color flashing (deprecated)
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        width: 42,
        margin: '4px -4px',
      },
      label: {
        color: labelColor,
        fontWeight: '400',
        position: 'relative',
        paddingTop: 1,
      },
      buttonState: {
        backgroundColor: datePicker.selectColor,
        borderRadius: '50%',
        height: 34,
        left: 4,
        opacity: buttonStateOpacity,
        position: 'absolute',
        top: -4,
        transform: buttonStateTransform,
        transition: Transition.easeOut(),
        width: 34,
      },
    };
  }

  handleMouseEnter(/* event */) {
    if (this.props.disabled === false && this.state.hover !== true) {
      this.setState({ hover: true });
    }
  }

  handleMouseLeave(/* event */) {
    if (this.props.disabled === false && this.state.hover !== false) {
      this.setState({ hover: false });
    }
  }

  handleTouchTap(event) {
    if (this.props.disabled === false) {
      const {
        onTouchTap,
      } = this.props;

      if (onTouchTap) {
        onTouchTap(event, this.props.value);
      }
    }
  }

  handleKeyboardFocus(event, keyboardFocused) {
    if (this.props.disabled === false) {
      const {
        onKeyboardFocus,
      } = this.props;

      if (onKeyboardFocus) {
        onKeyboardFocus(event, keyboardFocused, this.props.value);
      }
    }
  }

  render() {
    const {
      disabled,
      value,
      ...other
    } = this.props;

    const {
      prepareStyles,
    } = this.context.muiTheme;

    const {
      root,
      buttonState,
      label,
    } = this.getStyles();

    if (value) {
      return (
        <EnhancedButton
          {...other}
          disabled={disabled}
          disableFocusRipple
          disableTouchRipple
          onKeyboardFocus={this.onKeyboardFocus}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onTouchTap={this.onTouchTap}
          style={root}
        >
          <div
            style={prepareStyles(buttonState)}
          />
          <span
            style={prepareStyles(label)}
          >
            {value}
          </span>
        </EnhancedButton>
      );
    }

    return (
      <span
        style={prepareStyles(root)}
      />
    );
  }
}

export default PickerButton;

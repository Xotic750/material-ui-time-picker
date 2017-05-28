import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropTypeIntegerRange from './prop-type-integer-range';
import Picker from './Picker';

class HourPicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    title: PropTypes.string,
    titleStyle: PropTypes.shape({}),
    numberOfColumns: PropTypeIntegerRange(1, Number.MAX_SAFE_INTEGER),
    elementStep: PropTypeIntegerRange(1, Number.MAX_SAFE_INTEGER),
    onChange: PropTypes.func,
    onTouchTapButton: PropTypes.func,
    style: PropTypes.shape({}),
    noPad: PropTypes.bool,
    zDepth: PropTypeIntegerRange(0, 5),
    value: PropTypeIntegerRange(0, Number.MAX_SAFE_INTEGER),
  };

  static defaultProps = {
    disabled: false,
    title: 'Minute',
    titleStyle: undefined,
    numberOfColumns: 10,
    elementStep: 1,
    onChange: undefined,
    onTouchTapButton: undefined,
    style: undefined,
    noPad: undefined,
    zDepth: undefined,
    value: undefined,
  };

  render() {
    const {
      disabled,
      title,
      titleStyle,
      numberOfColumns,
      elementStep,
      onChange,
      onTouchTapButton,
      style,
      noPad,
      zDepth,
      value,
    } = this.props;

    return (
      <Picker
        disabled={disabled}
        style={style}
        title={title}
        titleStyle={titleStyle}
        numberOfColumns={numberOfColumns}
        numberOfElements={60}
        elementStep={elementStep}
        onChange={onChange}
        onTouchTapButton={onTouchTapButton}
        zDepth={zDepth}
        noPad={noPad}
        value={value}
      />
    );
  }
}

export default HourPicker;

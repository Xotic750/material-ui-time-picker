import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import uuid from 'uuid';
import PropTypeIntegerRange from './prop-type-integer-range';
import PickerButton from './PickerButton';

class Picker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    title: PropTypes.string,
    titleStyle: PropTypes.shape({}),
    numberOfColumns: PropTypeIntegerRange(1, Number.MAX_SAFE_INTEGER),
    numberOfElements: PropTypeIntegerRange(1, Number.MAX_SAFE_INTEGER),
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
    title: undefined,
    titleStyle: undefined,
    numberOfColumns: undefined,
    numberOfElements: undefined,
    elementStep: undefined,
    onChange: undefined,
    onTouchTapButton: undefined,
    style: undefined,
    noPad: false,
    zDepth: 0,
    value: undefined,
  };

  static contextTypes = {
    muiTheme: PropTypes.shape({}).isRequired,
  };

  static calculateNumberOfRows(number, numberOfColumns) {
    return Math.ceil(number / numberOfColumns);
  }

  static createIndexGenerator(start) {
    const number = Number(start) || 0;
    let index = Math.max(number, 0);
    return (function* indexGenerator() {
      while (index <= Number.MAX_SAFE_INTEGER) {
        yield index;
        index += 1;
      }
    }());
  }

  constructor(props) {
    super(props);
    this.state = {
      ...this.createArrays(),
    };
  }

  getStyles() {
    return {
      root: {
        display: 'inline-block',
        margin: '4px',
        opacity: this.props.disabled === true && '0.4',
      },
      title: {
        fontSize: '1em',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      row: {
        display: 'block',
      },
    };
  }

  createArrays() {
    const stepArray = this.createStepArray();
    const rowArray = this.createRowArray(stepArray.length);

    return {
      stepArray,
      rowArray,
    };
  }

  createStepArray() {
    const {
      numberOfElements,
      elementStep,
      value,
    } = this.props;

    return Array(numberOfElements / elementStep).fill().map((v, index) => {
      const val = elementStep * index;

      return {
        id: uuid.v4(),
        value: val,
        selected: val === value,
      };
    });
  }

  createRowArray(length) {
    const {
      numberOfColumns,
    } = this.props;

    const numberOfRows = Picker.calculateNumberOfRows(length, numberOfColumns);

    return Array(numberOfRows).fill().map(() => ({
      id: uuid.v4(),
    }));
  }

  createCell(index) {
    const {
      stepArray,
    } = this.state;

    if (Reflect.has(stepArray, index) === false) {
      return null;
    }

    const {
      numberOfElements,
      noPad,
    } = this.props;

    const targetLength = noPad ? 0 : numberOfElements.toString().length;
    const {
      id,
      value,
      selected,
    } = stepArray[index];

    return (
      <PickerButton
        key={id}
        onTouchTap={event => this.handleOnTouchTapButton(event, id, value)}
        selected={selected}
        value={value.toString().padStart(targetLength, '0')}
      />
    );
  }

  handleOnChange(event, id, value) {
    const {
      stepArray,
    } = this.state;

    const step = stepArray.find(entry => entry.id === id);
    if (step && step.selected !== true) {
      const updated = stepArray.map((entry) => {
        const clone = { ...entry };
        clone.selected = clone.id === id;
        return clone;
      });

      this.setState({ stepArray: updated });

      const {
        onChange,
      } = this.props;

      if (onChange) {
        onChange(event, value);
      }
    }
  }

  handleOnTouchTapButton(event, id, value) {
    this.handleOnChange(event, id, value);

    const {
      onTouchTapButton,
    } = this.props;

    if (onTouchTapButton) {
      onTouchTapButton(event, value);
    }
  }

  createCellsFn() {
    const idxGen = Picker.createIndexGenerator(0);
    const mapFn = () => this.createCell(idxGen.next().value);
    return () => Array(this.props.numberOfColumns).fill().map(mapFn);
  }

  render() {
    const {
      title,
      titleStyle,
      style,
      zDepth,
    } = this.props;

    const {
      rowArray,
    } = this.state;

    const styles = this.getStyles();
    const cells = this.createCellsFn();
    const grid = rowArray.map(row => (
      <div
        key={row.id}
        style={styles.row}
      >
        {cells()}
      </div>
    ));

    return (
      <Paper
        style={({ ...styles.root, ...style })}
        zDepth={zDepth}
      >
        <AppBar
          title={title}
          titleStyle={({ ...styles.title, ...titleStyle })}
          showMenuIconButton={false}
        />
        {grid}
      </Paper>
    );
  }
}

export default Picker;

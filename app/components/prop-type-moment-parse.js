import isNil from 'lodash/isNil';
import moment from 'moment';

const createError = (propName, componentName) => {
  const msg = `Invalid prop '${propName}' supplied to '${componentName}'.`;
  return new Error(msg);
};

const momentParse = (props, propName, componentName) => {
  const value = props[propName];
  if (isNil(value) || moment(value).isValid()) {
    return null;
  }

  return createError(propName, componentName);
};

export default momentParse;

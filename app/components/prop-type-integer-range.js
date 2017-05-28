import AirbnbPropTypes from 'airbnb-prop-types';

const PropTypeIntegerRange = (min, max) => {
  return AirbnbPropTypes.and([
    AirbnbPropTypes.nonNegativeInteger,
    AirbnbPropTypes.between({ gte: min, lte: max }),
  ]);
};

export default PropTypeIntegerRange;

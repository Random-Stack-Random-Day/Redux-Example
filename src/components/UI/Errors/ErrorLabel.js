import React from 'react';
import PropTypes from 'prop-types';

const ErrorLabel = props => (
    <label style={{ color: props.color }} className={props.className}>{props.error}</label>
);

ErrorLabel.propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    color: PropTypes.string
};

export default ErrorLabel;
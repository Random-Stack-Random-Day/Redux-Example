import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorLabel from '../Errors/ErrorLabel';

class Input extends Component {

    render() {

        const {
            label,
            error,
            ...rest
        } = this.props;

        return (
            <div className="input-wrapper">
                <label>{label}</label>
                <input
                    {...rest}
                    value={this.props.value || ''}
                />
                <ErrorLabel className="error-label" error={error} />
            </div>
        );
    }
}

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string
};

export default Input;
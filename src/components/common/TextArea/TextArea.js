import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextArea.module.scss';

const TextArea = ({ value, onChange, className, rows }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            className={`${styles.textarea} ${className}`}
            rows={rows}
        />
    );
};

TextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
};

TextArea.defaultProps = {
    className: '',
    rows: 5,
};

export default TextArea;

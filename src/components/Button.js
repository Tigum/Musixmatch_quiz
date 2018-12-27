import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { buttonClassName, buttonAction, buttonText } = props
    return <button className={buttonClassName} onClick={buttonAction} style={styles.button}>{buttonText}</button>
}

const styles = {
    button: {
        backgroundColor: '#ff4b2f',
        color: 'white',
        width: 200,
        height: 60,
        fontSize: 27,
        fontWeight: 200,
        marginTop: 20,
        border: 'none'
    },
}

Button.propTypes = {
    buttonAction: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
};

export default Button
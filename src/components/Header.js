import React from 'react'
import logo from '../img/logo.svg'

const HEADER_BACKGROUND_COLOR = '#f5f7fa'

const Header = () => {
    return (
        <header style={styles.mainDiv}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
            <img src={logo} style={styles.logo} alt='logo' />
        </header>
    )
}

const styles = {
    mainDiv: {
        height: 80,
        backgroundColor: HEADER_BACKGROUND_COLOR,
        textAlign: 'center'
    },
    logo: {
        width: 150,
        paddingTop: 25
    }
}

export default Header
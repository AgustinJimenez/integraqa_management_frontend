import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import LoginForm from './LoginForm'
import useStyles from './styles'
import { datasetSelector } from '../../redux/selectors'
import { useSelector } from 'react-redux'
import Router from 'next/router'

const Copyright = () => (
    <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://material-ui.com/'>
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
)

const AuthLayout = () => {
    const classes = useStyles()
    const user_has_auth = useSelector(state => datasetSelector(state, 'user_has_auth'))
    React.useEffect(() => {
        if (!user_has_auth) Router.replace('/login')
        else Router.replace('/dashboard')
    }, [user_has_auth])

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <LoginForm />
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default AuthLayout

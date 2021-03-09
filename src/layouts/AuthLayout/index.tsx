import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
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

const AuthLayout = ({ children, title = '' } = {}) => {
    const classes = useStyles()
    /* 
    const auth_token = useSelector(state => datasetSelector(state, 'auth_token'))
    React.useEffect(() => {
        if (!auth_token) Router.replace('/login')
        else Router.replace('/dashboard')
    }, [auth_token])
 */
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Grid container className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {title}
                </Typography>
                <form className={classes.form} noValidate>
                    {children}
                </form>
            </Grid>
        </Container>
    )
}

export default AuthLayout

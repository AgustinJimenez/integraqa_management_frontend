import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useDispatch } from 'react-redux'
import { authLoginSagaAction } from '../../sagas/actions'
import useStyles from './styles'

const RegisterForm = ({}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const emailRef: any = React.useRef(null)
    const passwordRef: any = React.useRef(null)
    /* const login = React.useCallback(() => {
        //console.log('LOGIN HERE ===> ', { emailRef, passwordRef, email: emailRef.current.value, password: passwordRef.current.value })
        dispatch(
            authLoginSagaAction({
                email: emailRef?.current?.value,
                password: passwordRef?.current?.value,
            }),
        )
    }, []) */

    return (
        <>
            <TextField
                inputRef={emailRef}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
            />
            <TextField
                inputRef={passwordRef}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
            />
            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
            <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={() => login()}>
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href='#' variant='body2'>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href='#' variant='body2'>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}
export default RegisterForm

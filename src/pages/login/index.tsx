import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { authLoginSagaAction } from '../../sagas/actions'
import useStyles from './styles'
import emailIsValid from '../../utils/emailIsValid'
import { datasetSelector } from '../../redux/selectors'

const LoginPage = (props: any) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const is_loading_login_submit = useSelector((state: any) => datasetSelector(state, 'is_loading_login_submit'))
    const [rememberMe, setRememberMe] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const login = React.useCallback(() => {
        dispatch(
            authLoginSagaAction({
                email,
                password,
                rememberMe,
            }),
        )
    }, [email, password, rememberMe])
    const loginFieldsAreValid = emailIsValid(email) && password.length > 3

    return (
        <AuthLayout title='Sign in'>
            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={event => setEmail(event.target.value)}
            />

            <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
                checked={rememberMe}
                onChange={(event: any) => setRememberMe(event.target.checked)}
            />

            <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={() => login()}
                disabled={!loginFieldsAreValid || is_loading_login_submit}
            >
                Sign In
            </Button>

            <Grid container>
                <Grid item xs>
                    <Link href='#' variant='body2'>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href='register' variant='body2'>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default LoginPage

import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { authLoginSagaAction, authRegisterSagaAction } from '../../sagas/actions'
import useStyles from './styles'
import AuthLayout from '../../layouts/AuthLayout'
import emailIsValid from '../../utils/emailIsValid'
import { datasetSelector } from '../../redux/selectors'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setDatasetToReducer } from '../../redux/actions'

const RegisterForm = ({}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const passwordRef: any = React.useRef(null)
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const is_loading_register_submit = useSelector(state => datasetSelector(state, 'is_loading_register_submit'))
    React.useEffect(() => {
        dispatch(setDatasetToReducer(false, 'is_loading_register_submit'))
    }, [])
    const formIsValid = React.useMemo(() => {
        return !!password && !!name && !!email && emailIsValid(email) && password.length >= 6 && !is_loading_register_submit
    }, [email, name, password, is_loading_register_submit])

    const submit = React.useCallback(() => {
        dispatch(
            authRegisterSagaAction({
                email,
                name,
                password,
            }),
        )
    }, [email, name, password])

    return (
        <AuthLayout title='Create a account'>
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
                id='fullname'
                label='Full Name'
                name='name'
                autoComplete='fullname'
                onChange={event => setName(event.target.value)}
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
                onChange={event => setPassword(event.target.value)}
            />
            <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={submit} disabled={!formIsValid}>
                {is_loading_register_submit ? <CircularProgress color='primary' size={25} /> : 'Create Account'}
            </Button>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                    <Link href='login' variant='body2'>
                        Already registered? Log In
                    </Link>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}
export default RegisterForm

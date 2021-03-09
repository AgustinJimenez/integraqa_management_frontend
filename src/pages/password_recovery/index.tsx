import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { passwordRecoverySagaAction } from '../../sagas/actions'
import useStyles from './styles'
import AuthLayout from '../../layouts/AuthLayout'
import emailIsValid from '../../utils/emailIsValid'
import { datasetSelector } from '../../redux/selectors'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setDatasetToReducer } from '../../redux/actions'

const PasswordRecoveryPage = ({}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [email, setEmail] = React.useState('')
    const is_loading_recovery_email_submit = useSelector((state: any) => datasetSelector(state, 'is_loading_recovery_email_submit'))
    React.useEffect(() => {
        dispatch(setDatasetToReducer(false, 'is_loading_recovery_email_submit'))
    }, [])
    const formIsValid = React.useMemo(() => {
        return emailIsValid(email) && !is_loading_recovery_email_submit
    }, [email, is_loading_recovery_email_submit])

    const submit = React.useCallback(() => {
        dispatch(
            passwordRecoverySagaAction({
                email,
            }),
        )
    }, [email])

    return (
        <AuthLayout title='Recover your password'>
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
            <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={submit} disabled={!formIsValid}>
                {is_loading_recovery_email_submit ? <CircularProgress color='primary' size={25} /> : 'Send Recovery Email'}
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
export default PasswordRecoveryPage

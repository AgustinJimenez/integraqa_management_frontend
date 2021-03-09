import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { passwordResetCodeCheckSagaAction, passwordResetSagaAction } from '../../sagas/actions'
import useStyles from './styles'
import AuthLayout from '../../layouts/AuthLayout'
import emailIsValid from '../../utils/emailIsValid'
import { datasetSelector } from '../../redux/selectors'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setDatasetToReducer } from '../../redux/actions'
import { useRouter } from 'next/router'

const PasswordResetPage = ({}) => {
    const router = useRouter()
    const reset_code: string | string[] = router.query?.rc
    const dispatch = useDispatch()
    const classes = useStyles()
    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')
    const [verificationCodeChecked, setVerificationCodeChecked] = React.useState(false)
    const is_loading_reset_email_submit = useSelector((state: any) => datasetSelector(state, 'is_loading_reset_email_submit'))
    const is_loading_reset_code_check = useSelector((state: any) => datasetSelector(state, 'is_loading_reset_code_check'))
    React.useEffect(() => {
        dispatch(setDatasetToReducer(false, 'is_loading_reset_email_submit'))
    }, [])
    const formIsValid = React.useMemo(() => {
        return password?.length >= 6 && password === repeatPassword && !is_loading_reset_email_submit && !is_loading_reset_code_check
    }, [password, repeatPassword, is_loading_reset_email_submit, is_loading_reset_code_check])

    const submit = React.useCallback(() => {
        dispatch(
            passwordResetSagaAction({
                new_password: password,
                reset_code,
            }),
        )
    }, [password, reset_code])

    React.useEffect(() => {
        if (!!reset_code)
            dispatch(
                passwordResetCodeCheckSagaAction({
                    reset_code,
                    callback: () => setVerificationCodeChecked(true),
                }),
            )
    }, [reset_code])

    return (
        <AuthLayout title='Recover your password'>
            <TextField
                disabled={!verificationCodeChecked}
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
            <TextField
                disabled={!verificationCodeChecked}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='repeatPassword'
                label='Repeat password'
                type='password'
                id='repeat-password'
                autoComplete='current-password'
                onChange={event => setRepeatPassword(event.target.value)}
            />
            <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={submit} disabled={!formIsValid}>
                {is_loading_reset_code_check || is_loading_reset_email_submit ? <CircularProgress color='primary' size={25} /> : 'Update password'}
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
export default PasswordResetPage

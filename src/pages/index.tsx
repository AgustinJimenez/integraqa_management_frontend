import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import MealCard from '../components/MealCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar'
import { datasetSelector } from '../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { setDatasetListToReducer, setDatasetToReducer } from '../redux/actions'
import { FaSearch, FaCheck } from 'react-icons/fa'
import { sagaSearchMealAction } from '../sagas/actions'
import { PaginatedList } from 'react-paginated-list'

let searchTimer: any = null

const HomePage = (props: any) => {
    return <AuthLayout></AuthLayout>
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default HomePage

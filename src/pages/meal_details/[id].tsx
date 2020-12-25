import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Layout from '../../layout'
import Link from 'next/link'
import request from '../../utils/request'
import { url_show_by_id } from '../../api'
import { homePageRouteProps } from '../../routes'
import { datasetSelector } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { initializeStore } from '../../redux/store'
import Meal from '../../interfaces/Meal'
import { setDatasetToReducer } from '../../redux/actions'
import capitalizeWords from '../../utils/capitalizeWords'

const MealNameFilter = (name: string) => !(name === 'idMeal' || name === 'dateModified' || name === 'strMealThumb')

const mealNameFormated = (name: string) =>
    capitalizeWords(
        name
            .replace('str', '')
            .replace(/([A-Z])/g, ' $1')
            .trim(),
    )

const mealFieldContend = (name: string, meal: any) => {
    let value: any = meal[name]
    let content: any = null
    if (name === 'strYoutube') content = <a href={value}>{value}</a>
    else content = meal[name]

    return (
        <p>
            <b>{mealNameFormated(name)}:</b>
            <span style={{ float: 'right' }}>{content}</span>
        </p>
    )
}

const ProductDetailsPage = (props: any) => {
    //console.log('ProductDetailsPage ===> ', props)
    const dispatch = useDispatch()
    const meal: any = useSelector((state: any) => datasetSelector(state, 'meals', { id: props.id }))
    const fetchMeal: any = React.useCallback(async () => {
        let { data, error } = await request({ url: url_show_by_id, params: { i: props.id } })
        if (error) return
        let meal = data?.meals?.[0]
        dispatch(setDatasetToReducer(meal, 'meals', { key: props.id }))
    }, [])

    React.useEffect(() => {
        fetchMeal()
    }, [])
    console.log('HERE ===> ', meal)

    return (
        <Layout>
            <Container className='my-5'>
                <Row className='justify-content-md-center'>
                    <Col lg={6} md={12}>
                        <h1 className='text-light text-center'>
                            <b>{meal?.strMeal}</b>
                        </h1>
                        <Image src={meal.strMealThumb} thumbnail fluid />
                        <ListGroup>
                            {Object.keys(meal)
                                .filter(MealNameFilter)
                                .filter((name: string, key: number) => !!meal[name])
                                .map((name: string, key: number) => (
                                    <ListGroup.Item className='w-100' key={key}>
                                        {mealFieldContend(name, meal)}
                                    </ListGroup.Item>
                                ))}
                        </ListGroup>
                        <Container className='mt-3'>
                            <Link {...homePageRouteProps}>
                                <Button block variant='danger'>
                                    Back
                                </Button>
                            </Link>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    //const reduxStore = initializeStore()
    let { id } = context.query
    return { props: { id } }
}

export default ProductDetailsPage

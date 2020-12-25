import React from 'react'
import Layout from '../layout'
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
    const dispatch = useDispatch()
    const inputRef: any = React.useRef(null)
    const searched_meals_ids: any = useSelector((state: any) => datasetSelector(state, 'searched_meals')) || []
    const search_meal_filter: string = useSelector((state: any) => datasetSelector(state, 'search_meal_filter'))
    const meals: any = useSelector((state: any) => datasetSelector(state, 'meals', { list_format: true, ids: searched_meals_ids }))
    const search_input: any = useSelector((state: any) => datasetSelector(state, 'search_input'))
    const fetchMeals = React.useCallback(() => dispatch(sagaSearchMealAction()), [])
    const setMealFilter = React.useCallback((name: string) => {
        dispatch(setDatasetToReducer(name, 'search_meal_filter'))
        fetchMeals()
    }, [])
    const setSearchInput = React.useCallback(
        text => {
            dispatch(setDatasetToReducer(text, 'search_input'))
            clearTimeout(searchTimer)
            searchTimer = setTimeout(() => {
                fetchMeals()
            }, 500)
        },
        [search_input],
    )
    return (
        <Layout>
            <Container fluid>
                <Navbar expand='lg' variant='light' bg='light'>
                    <Container>
                        <Navbar.Brand href='#'>
                            <p>
                                <b>GET MY MEAL</b>
                            </p>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Container fluid className='pt-2'>
                    <Row className='justify-content-md-center'>
                        <Col xs={6}>
                            <InputGroup className='mb-3'>
                                <FormControl
                                    ref={inputRef}
                                    value={search_input}
                                    placeholder='Search by name, ingredient or category.'
                                    onChange={event => setSearchInput(event.target.value)}
                                />
                                <InputGroup.Append>
                                    <Dropdown>
                                        <Dropdown.Toggle variant='danger' />
                                        <Dropdown.Menu>
                                            {[
                                                { name: 'name', label: 'Name' },
                                                { name: 'ingredient', label: 'Ingredient' },
                                                { name: 'category', label: 'Category' },
                                            ].map(({ name, label }: any, key: number) => (
                                                <Dropdown.Item key={key} active={search_meal_filter === name} onClick={() => setMealFilter(name)}>
                                                    {label}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>

                <PaginatedList
                    //controlItemClass='bg-'
                    list={meals}
                    itemsPerPage={6}
                    renderList={meals => (
                        <Row style={{}}>
                            {meals.map((meal: any, key: number) => (
                                <Col lg='4' md='12' key={key} style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                                    <MealCard meal={meal} key={key} />
                                </Col>
                            ))}
                        </Row>
                    )}
                />
            </Container>
        </Layout>
    )
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default HomePage

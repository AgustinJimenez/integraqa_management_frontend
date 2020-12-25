import React from 'react'
import Meal from '../interfaces/Meal'
import Card from 'react-bootstrap/Card'
import { mealDetailsPageProps } from '../routes'
import Link from 'next/link'
import Image from 'next/image'

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    return (
        <>
            <Link {...mealDetailsPageProps({ query: meal, id: meal.idMeal })}>
                <Card style={{ cursor: 'pointer' }} className='text-center'>
                    <Card.Img variant='top' src={meal.strMealThumb} />
                    {/* <Image src={meal.strMealThumb} layout='fill' /> */}
                    <Card.Body>
                        <Card.Title>{meal.strMeal}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default MealCard

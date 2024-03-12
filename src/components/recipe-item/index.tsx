import React from 'react'
import { Link } from 'react-router-dom'
import { RecipeType } from '../../models/recipeType'

type Props = {
  recipe : RecipeType
}

const RecipeItem = ({recipe}: Props) => {
  return (
    <div className='flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white'>
      <div className='h-40 flex justify-center overflow-hidden items-center rounded-xl'>
        <img src={recipe.image_url} alt={recipe.title} className='block w-full' />
      </div>
      <div>
        <span className='text-sm text-cyan-700 font-medium'>{recipe.publisher}</span>
        <h3 className='font-bold text-2xl truncate text-black'>{recipe.title}</h3>
        <Link to={`/recipes/${recipe.id}`} className='text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white'>Recipe Details</Link>
      </div>
    </div>
  )
}

export default RecipeItem
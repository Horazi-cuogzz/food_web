import { createContext, useEffect, useState } from 'react'
import sampleData from '../data/sampleData'
import { loadStorage, saveStorage } from '../untils/storage'

export const FoodContext = createContext()

const STORAGE_KEY = 'foods'

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState(() =>
    loadStorage(STORAGE_KEY, sampleData)
  )

  useEffect(() => {
    saveStorage(STORAGE_KEY, foods)
  }, [foods])

  const addFood = (food) => {
    setFoods([...foods, food])
  }

  const deleteFood = (id) => {
    setFoods(foods.filter((item) => item.id !== id))
  }

  const updateFood = (updatedFood) => {
    setFoods(
      foods.map((item) =>
        item.id === updatedFood.id ? updatedFood : item
      )
    )
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        addFood,
        deleteFood,
        updateFood
      }}
    >
      {children}
    </FoodContext.Provider>
  )
}
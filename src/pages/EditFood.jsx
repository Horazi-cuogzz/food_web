import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FoodForm from '../components/FoodForm'
import { FoodContext } from '../context/FoodContext'

function EditFood() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { foods, updateFood } = useContext(FoodContext)

  const foodToEdit = foods.find((item) => item.id === id)

  if (!foodToEdit) {
    return (
      <div className='container py-5'>
        <h3>Không tìm thấy sản phẩm để chỉnh sửa.</h3>
      </div>
    )
  }

  const handleUpdate = (updatedFood) => {
    updateFood(updatedFood)
    navigate(`/detail/${updatedFood.id}`)
  }

  return (
    <div className='container py-4'>
      <h2 className='mb-4'>Chỉnh sửa sản phẩm</h2>
      <FoodForm
        initialData={foodToEdit}
        onSubmit={handleUpdate}
        submitLabel='Cập nhật sản phẩm'
      />
    </div>
  )
}

export default EditFood

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FoodForm from '../components/FoodForm'
import { FoodContext } from '../context/FoodContext'
import './AddFood.css'

function AddFood() {
  const { addFood } = useContext(FoodContext)
  const navigate = useNavigate()

  const handleAdd = (food) => {
    addFood(food)
    navigate('/')
  }

  return (
    <div className="add-page">
      <div className="add-container">
        <div className="add-header">
          <div className="add-header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="add-header-text">
            <h2>Thêm Sản Phẩm Mới</h2>
            <p>Nhập thông tin chi tiết để thêm sản phẩm vào kho hàng</p>
          </div>
        </div>
        
        <div className="add-form-wrapper">
          <FoodForm onSubmit={handleAdd} submitLabel="Lưu Sản Phẩm" />
        </div>
      </div>
    </div>
  )
}

export default AddFood
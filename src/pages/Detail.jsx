import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FoodContext } from '../context/FoodContext'
import { getExpiryDays, isExpired, isSoonExpiry } from '../untils/expiry'

function Detail() {
  const { foods, deleteFood } = useContext(FoodContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const food = foods.find((item) => item.id === id)

  if (!food) {
    return (
      <div className='container py-5'>
        <h3>Không tìm thấy sản phẩm.</h3>
        <Link to='/' className='btn btn-secondary mt-3'>
          Quay lại trang chủ
        </Link>
      </div>
    )
  }

  const expiryDays = getExpiryDays(food.expiryDate)
  let badgeClass = 'bg-success'
  let badgeText = 'Còn hạn'

  if (isExpired(expiryDays)) {
    badgeClass = 'bg-danger'
    badgeText = 'Đã hết hạn'
  } else if (isSoonExpiry(expiryDays)) {
    badgeClass = 'bg-warning text-dark'
    badgeText = `Còn ${expiryDays} ngày`
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có muốn xóa sản phẩm này?')) {
      deleteFood(id)
      navigate('/')
    }
  }

  return (
    <div className='container py-5'>
      <div className='mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2'>
        <div>
          <h2>{food.name}</h2>
          <small className='text-muted'>{food.brand}</small>
        </div>
        <div className='d-flex gap-2'>
          <Link to={`/edit/${food.id}`} className='btn btn-outline-primary'>
            Chỉnh sửa
          </Link>
          <button className='btn btn-danger' onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>

      <div className='row g-4'>
        <div className='col-lg-5'>
          <div className='card shadow-sm'>
            <img
              src={food.image}
              className='card-img-top'
              alt={food.name}
              style={{ height: '320px', objectFit: 'cover' }}
            />
            <div className='card-body'>
              <p className='mb-1'>
                <strong>Giá:</strong>{' '}
                {food.price.toLocaleString()} VNĐ
              </p>
              <p className='mb-1'>
                <strong>Đơn vị:</strong> {food.unit}
              </p>
              <p className='mb-1'>
                <strong>Số lượng:</strong> {food.quantity}
              </p>
              <p className='mb-1'>
                <strong>Hạn sử dụng:</strong> {food.expiryDate}
              </p>
              <span className={`badge ${badgeClass} mb-2`}>{badgeText}</span>
            </div>
          </div>
        </div>

        <div className='col-lg-7'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <h5 className='card-title mb-3'>Thông tin chi tiết</h5>
              <dl className='row'>
                <dt className='col-sm-4'>Loại sản phẩm</dt>
                <dd className='col-sm-8'>{food.category}</dd>

                <dt className='col-sm-4'>Trạng thái</dt>
                <dd className='col-sm-8'>{food.status}</dd>

                <dt className='col-sm-4'>Mô tả</dt>
                <dd className='col-sm-8'>{food.description}</dd>

                <dt className='col-sm-4'>Giá trị tồn kho</dt>
                <dd className='col-sm-8'>
                  {(food.price * food.quantity).toLocaleString()} VNĐ
                </dd>
              </dl>
              <Link to='/' className='btn btn-secondary'>
                Quay lại
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

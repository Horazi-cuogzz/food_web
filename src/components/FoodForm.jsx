import { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './FoodForm.css'

function FoodForm({ onSubmit, initialData = null, submitLabel = 'Thêm sản phẩm' }) {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    category: initialData?.category || '',
    brand: initialData?.brand || '',
    price: initialData?.price ?? '',
    unit: initialData?.unit || '',
    quantity: initialData?.quantity ?? '',
    expiryDate: initialData?.expiryDate || '',
    image: initialData?.image || '',
    status: initialData?.status || 'Còn hàng',
    description: initialData?.description || ''
  }))

  const [errors, setErrors] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        brand: initialData.brand || '',
        price: initialData.price ?? '',
        unit: initialData.unit || '',
        quantity: initialData.quantity ?? '',
        expiryDate: initialData.expiryDate || '',
        image: initialData.image || '',
        status: initialData.status || 'Còn hàng',
        description: initialData.description || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on type
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
  }

  const processFile = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }))
      if (errors.image) setErrors(prev => ({ ...prev, image: null }))
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm không được trống'
    if (!formData.category) newErrors.category = 'Vui lòng chọn loại sản phẩm'
    if (!formData.brand.trim()) newErrors.brand = 'Thương hiệu không được trống'
    if (!formData.unit.trim()) newErrors.unit = 'Đơn vị không được trống'
    if (!formData.expiryDate) newErrors.expiryDate = 'Vui lòng chọn hạn sử dụng'
    if (!formData.image.trim()) newErrors.image = 'Vui lòng chọn ảnh'
    if (Number(formData.price) <= 0 || formData.price === '') newErrors.price = 'Giá phải > 0'
    if (Number(formData.quantity) < 0 || formData.quantity === '') newErrors.quantity = 'Số lượng >= 0'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const foodData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      id: initialData?.id || uuidv4()
    }

    onSubmit(foodData)
  }

  return (
    <form className="ff-form" onSubmit={handleSubmit}>
      <div className="ff-layout">
        
        {/* Left Column: Image Upload */}
        <div className="ff-col ff-col-left" style={{ animationDelay: '0.1s' }}>
          <div className="ff-group">
            <label className="ff-label">Ảnh Sản Phẩm</label>
            <div 
              className={`ff-upload-area ${isDragging ? 'dragging' : ''} ${formData.image ? 'has-image' : ''} ${errors.image ? 'has-error' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="ff-file-hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              
              {formData.image ? (
                <div className="ff-image-preview">
                  <img src={formData.image} alt="Preview" />
                  <div className="ff-image-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span>Nhấn để thay đổi ảnh</span>
                  </div>
                </div>
              ) : (
                <div className="ff-upload-placeholder">
                  <div className="ff-upload-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <p className="ff-upload-title">Kéo thả ảnh vào đây</p>
                  <p className="ff-upload-sub">hoặc nhấn để duyệt file</p>
                </div>
              )}
            </div>
            {errors.image && <span className="ff-error-text">{errors.image}</span>}
            
            <div className="ff-or-divider"><span>HOẶC</span></div>
            
            <input
              type="text"
              className="ff-input"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Dán URL hình ảnh..."
            />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="ff-col ff-col-right" style={{ animationDelay: '0.2s' }}>
          
          <div className="ff-row">
            <div className="ff-group ff-w50">
              <label className="ff-label">Tên sản phẩm</label>
              <input type="text" className={`ff-input ${errors.name ? 'error' : ''}`} name="name" value={formData.name} onChange={handleChange} placeholder="VD: Cà chua Đà Lạt"/>
              {errors.name && <span className="ff-error-text">{errors.name}</span>}
            </div>
            <div className="ff-group ff-w50">
              <label className="ff-label">Thương hiệu</label>
              <input type="text" className={`ff-input ${errors.brand ? 'error' : ''}`} name="brand" value={formData.brand} onChange={handleChange} placeholder="VD: Vinamilk"/>
              {errors.brand && <span className="ff-error-text">{errors.brand}</span>}
            </div>
          </div>

          <div className="ff-row">
            <div className="ff-group ff-w50">
              <label className="ff-label">Danh mục</label>
              <div className="ff-select-wrap">
                <select className={`ff-select ${errors.category ? 'error' : ''}`} name="category" value={formData.category} onChange={handleChange}>
                  <option value="" disabled>Chọn danh mục</option>
                  <option value="Rau củ">Rau củ</option>
                  <option value="Đồ uống">Đồ uống</option>
                  <option value="Bánh kẹo">Bánh kẹo</option>
                  <option value="Gia vị">Gia vị</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              {errors.category && <span className="ff-error-text">{errors.category}</span>}
            </div>
            <div className="ff-group ff-w50">
              <label className="ff-label">Trạng thái kho</label>
              <div className="ff-select-wrap">
                <select className="ff-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>
            </div>
          </div>

          <div className="ff-row">
            <div className="ff-group ff-w33">
              <label className="ff-label">Giá (VNĐ)</label>
              <div className="ff-input-icon">
                <span className="ff-icon-left">₫</span>
                <input type="number" className={`ff-input has-icon ${errors.price ? 'error' : ''}`} name="price" value={formData.price} onChange={handleChange} placeholder="0"/>
              </div>
              {errors.price && <span className="ff-error-text">{errors.price}</span>}
            </div>
            <div className="ff-group ff-w33">
              <label className="ff-label">Số lượng</label>
              <input type="number" className={`ff-input ${errors.quantity ? 'error' : ''}`} name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0"/>
              {errors.quantity && <span className="ff-error-text">{errors.quantity}</span>}
            </div>
            <div className="ff-group ff-w33">
              <label className="ff-label">Đơn vị tính</label>
              <input type="text" className={`ff-input ${errors.unit ? 'error' : ''}`} name="unit" value={formData.unit} onChange={handleChange} placeholder="Kg, Hộp..."/>
              {errors.unit && <span className="ff-error-text">{errors.unit}</span>}
            </div>
          </div>

          <div className="ff-row">
            <div className="ff-group ff-w100">
              <label className="ff-label">Hạn sử dụng</label>
              <input type="date" className={`ff-input ${errors.expiryDate ? 'error' : ''}`} name="expiryDate" value={formData.expiryDate} onChange={handleChange}/>
              {errors.expiryDate && <span className="ff-error-text">{errors.expiryDate}</span>}
            </div>
          </div>

          <div className="ff-row">
            <div className="ff-group ff-w100">
              <label className="ff-label">Mô tả thêm</label>
              <textarea className="ff-textarea" name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Nhập ghi chú hoặc mô tả về sản phẩm..."></textarea>
            </div>
          </div>

        </div>
      </div>

      <div className="ff-footer" style={{ animationDelay: '0.3s' }}>
        <button type="submit" className="ff-submit-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default FoodForm
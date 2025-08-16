"use client"

import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const API_KEY = "jWrXVOAnXgu0drz24CSqNsTPiyx8dO88n1mOcb42GXNs2raQh8PcED7D"

const App = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: "",
    buy: "",
    sell: "",
    stock: "",
    category: "",
    size: "",
    image: "",
  })
  const [selectedCategory, setSelectedCategory] = useState("")
  const [saleForm, setSaleForm] = useState({ name: "", quantity: "" })
  const [totalProfit, setTotalProfit] = useState(0)
  const [saleProfit, setSaleProfit] = useState(null)
  const [monthlyViewProduct, setMonthlyViewProduct] = useState("")
  const [categorySummary, setCategorySummary] = useState({})
  const [editingProductIndex, setEditingProductIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    const fetchImages = async () => {
      if (!form.name) return
      setIsLoading(true)
      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(form.name)}&per_page=1`, {
          headers: {
            Authorization: API_KEY,
          },
        })
        const data = await res.json()
        if (data.photos && data.photos.length > 0) {
          setForm((prevForm) => ({ ...prevForm, image: data.photos[0].src.medium }))
        } else {
          setForm((prevForm) => ({ ...prevForm, image: "" }))
        }
      } catch (error) {
        console.error("Error fetching image:", error)
        setForm((prevForm) => ({ ...prevForm, image: "" }))
      } finally {
        setIsLoading(false)
      }
    }
    const debounceTimer = setTimeout(fetchImages, 500)
    return () => clearTimeout(debounceTimer)
  }, [form.name])

  useEffect(() => {
    const summary = {}
    products.forEach((p) => {
      summary[p.category] = (summary[p.category] || 0) + 1
    })
    setCategorySummary(summary)
  }, [products])

  const handleAddProduct = () => {
    if (!form.name || !form.buy || !form.sell || !form.stock || !form.category) {
      toast.error("Please fill all product fields.")
      return
    }
    if (isNaN(form.buy) || isNaN(form.sell) || isNaN(form.stock)) {
      toast.error("Buying Price, Selling Price, and Stock must be numbers.")
      return
    }
    const profit = (Number.parseFloat(form.sell) - Number.parseFloat(form.buy)) * Number.parseInt(form.stock)
    const now = new Date().toISOString()
    const newProduct = {
      ...form,
      buy: Number.parseFloat(form.buy),
      sell: Number.parseFloat(form.sell),
      stock: Number.parseInt(form.stock),
      profit: profit,
      originalStock: Number.parseInt(form.stock),
      createdAt: now,
      lastUpdatedAt: now,
      sales: [],
    }
    setProducts([...products, newProduct])
    setTotalProfit(totalProfit + profit)
    toast.success("Product added successfully!")
    setForm({
      name: "",
      buy: "",
      sell: "",
      stock: "",
      category: "",
      size: "",
      image: "",
    })
    setSelectedCategory("")
  }

  const handleDelete = (index) => {
    const updatedProducts = [...products]
    const productToDelete = updatedProducts[index]
    setTotalProfit(totalProfit - productToDelete.profit)
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
    toast.info("Product deleted.")
  }

  const handleSale = () => {
    if (!saleForm.name || !saleForm.quantity) {
      toast.error("Please select a product and enter quantity for sale.")
      return
    }
    const productIndex = products.findIndex((p) => p.name === saleForm.name)
    if (productIndex === -1) {
      toast.error("Product not found. Please select from the list.")
      return
    }
    const productToSale = products[productIndex]
    const quantitySold = Number.parseInt(saleForm.quantity)
    if (productToSale.stock < quantitySold) {
      toast.error("Not enough stock available.")
      return
    }
    if (quantitySold <= 0) {
      toast.error("Quantity to sell must be positive.")
      return
    }
    const updatedProducts = [...products]
    const soldProfit = (productToSale.sell - productToSale.buy) * quantitySold
    const now = new Date().toISOString()
    updatedProducts[productIndex] = {
      ...productToSale,
      stock: productToSale.stock - quantitySold,
      profit: productToSale.profit - soldProfit,
      lastUpdatedAt: now,
      sales: [...productToSale.sales, { quantity: quantitySold, profit: soldProfit, date: now }],
    }
    setProducts(updatedProducts)
    setTotalProfit(totalProfit + soldProfit)
    setSaleProfit(soldProfit)
    toast.success(`Sale of ${quantitySold} ${productToSale.name}(s) processed!`)
    setSaleForm({ name: "", quantity: "" })
  }

  const renderMonthlyProfit = (product) => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlySales = product.sales.filter(
      (sale) => new Date(sale.date).getMonth() === currentMonth && new Date(sale.date).getFullYear() === currentYear,
    )
    const monthlyProfit = monthlySales.reduce((sum, s) => sum + s.profit, 0)
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>
              <strong>Original Stock:</strong> {product.originalStock}
            </p>
            <p>
              <strong>Remaining:</strong> {product.stock}
            </p>
          </div>
          <div>
            <p>
              <strong>Sold:</strong> {product.originalStock - product.stock}
            </p>
            <p>
              <strong>Monthly Profit:</strong> ₹{monthlyProfit.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleEdit = (index) => {
    const productToEdit = products[index]
    setForm({
      name: productToEdit.name,
      buy: productToEdit.buy.toString(),
      sell: productToEdit.sell.toString(),
      stock: productToEdit.stock.toString(),
      category: productToEdit.category,
      size: productToEdit.size,
      image: productToEdit.image,
    })
    setSelectedCategory(productToEdit.category)
    setEditingProductIndex(index)
  }

  const handleSaveEdit = () => {
    if (!form.name || !form.buy || !form.sell || !form.stock || !form.category) {
      toast.error("Please fill all product fields to save changes.")
      return
    }
    if (isNaN(form.buy) || isNaN(form.sell) || isNaN(form.stock)) {
      toast.error("Buying Price, Selling Price, and Stock must be numbers.")
      return
    }
    const updatedProducts = [...products]
    const oldProduct = updatedProducts[editingProductIndex]
    const stockChanged = Number.parseInt(form.stock) !== oldProduct.stock
    const now = new Date().toISOString()
    const newProfit = (Number.parseFloat(form.sell) - Number.parseFloat(form.buy)) * Number.parseInt(form.stock)
    setTotalProfit(totalProfit - oldProduct.profit + newProfit)
    updatedProducts[editingProductIndex] = {
      ...form,
      buy: Number.parseFloat(form.buy),
      sell: Number.parseFloat(form.sell),
      stock: Number.parseInt(form.stock),
      profit: newProfit,
      originalStock: oldProduct.originalStock,
      createdAt: oldProduct.createdAt,
      lastUpdatedAt: stockChanged ? now : oldProduct.lastUpdatedAt,
      sales: oldProduct.sales,
    }
    setProducts(updatedProducts)
    setEditingProductIndex(null)
    toast.success("Product updated successfully!")
    setForm({
      name: "",
      buy: "",
      sell: "",
      stock: "",
      category: "",
      size: "",
      image: "",
    })
    setSelectedCategory("")
  }

  const cancelEdit = () => {
    setEditingProductIndex(null)
    setForm({
      name: "",
      buy: "",
      sell: "",
      stock: "",
      category: "",
      size: "",
      image: "",
    })
    setSelectedCategory("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white border-b mb-6">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center">Taj Enterprises Inventory</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Add/Edit Product */}
          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-bold mb-4">
              {editingProductIndex !== null ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Buying Price (₹)"
                  value={form.buy}
                  onChange={(e) => setForm({ ...form, buy: e.target.value })}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Selling Price (₹)"
                  value={form.sell}
                  onChange={(e) => setForm({ ...form, sell: e.target.value })}
                  className="p-2 border rounded"
                />
              </div>
              <input
                type="number"
                placeholder="Stock Quantity"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={form.category}
                onChange={(e) => {
                  setForm({ ...form, category: e.target.value, size: "" })
                  setSelectedCategory(e.target.value)
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="colddrink">Cold Drink</option>
                <option value="bakery">Bakery</option>
              </select>
              {selectedCategory === "colddrink" && (
                <select
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Size</option>
                  <option value="200ml">200ml</option>
                  <option value="250ml">250ml</option>
                  <option value="300ml">300ml</option>
                  <option value="500ml">500ml</option>
                  <option value="600ml">600ml</option>
                  <option value="750ml">750ml</option>
                  <option value="1000ml">1000ml</option>
                  <option value="1500ml">1500ml</option>
                  <option value="1750ml">1750ml</option>
                  <option value="2000ml">2000ml</option>
                  <option value="2250ml">2250ml</option>
                </select>
              )}
              <div className="flex gap-2">
                {editingProductIndex !== null ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                    <button onClick={cancelEdit} className="px-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddProduct}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Add Product
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sell Product */}
          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-bold mb-4">Sell Product</h2>
            <div className="space-y-3">
              <select
                value={saleForm.name}
                onChange={(e) => setSaleForm({ ...saleForm, name: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Product to Sell</option>
                {products.map((p, i) => (
                  <option key={i} value={p.name} disabled={p.stock === 0}>
                    {p.name} (Stock: {p.stock}) {p.stock === 0 ? "(Out of Stock)" : ""}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity to Sell"
                value={saleForm.quantity}
                onChange={(e) => setSaleForm({ ...saleForm, quantity: e.target.value })}
                className="w-full p-2 border rounded"
                min="1"
              />
              <button
                onClick={handleSale}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Process Sale
              </button>
              {saleProfit !== null && (
                <div className="bg-green-100 border border-green-200 rounded p-3 text-center">
                  <p className="text-green-700 font-bold">Profit from last sale: ₹{saleProfit.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard Insights */}
          <div className="bg-white border rounded p-4">
            <h2 className="text-lg font-bold mb-4">Dashboard Insights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Category Overview</h3>
                {Object.keys(categorySummary).length === 0 ? (
                  <p className="text-gray-500 italic">No products added yet</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(categorySummary).map(([cat, count], i) => (
                      <div key={i} className="flex justify-between p-2 bg-gray-100 rounded">
                        <span className="capitalize">{cat}</span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Monthly Performance</h3>
                <select onChange={(e) => setMonthlyViewProduct(e.target.value)} className="w-full p-2 border rounded">
                  <option value="">Select Product to View</option>
                  {products.map((p, i) => (
                    <option key={i} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {products
                  .filter((p) => p.name === monthlyViewProduct)
                  .map((p, i) => (
                    <div key={i}>{renderMonthlyProfit(p)}</div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Inventory */}
        <div className="bg-white border rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Current Inventory</h2>
            <span className="bg-gray-200 px-3 py-1 rounded">{products.length} Products</span>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products in inventory</p>
              <p className="text-gray-400">Start by adding your first product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p, index) => (
                <div key={index} className="border rounded p-4">
                  {p.image && (
                    <img
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p>
                        <strong>Buy:</strong> ₹{p.buy.toFixed(2)}
                      </p>
                      <p>
                        <strong>Sell:</strong> ₹{p.sell.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Stock:</strong>{" "}
                        <span
                          className={
                            p.stock <= 5 && p.stock > 0
                              ? "text-orange-600"
                              : p.stock === 0
                                ? "text-red-600"
                                : "text-green-600"
                          }
                        >
                          {p.stock}
                        </span>
                      </p>
                      <p>
                        <strong>Category:</strong> {p.category}
                      </p>
                    </div>
                  </div>
                  {p.size && (
                    <p className="text-sm mb-2">
                      <strong>Size:</strong> {p.size}
                    </p>
                  )}
                  <div className="bg-green-100 rounded p-2 mb-3 text-center">
                    <p className="text-green-700 font-bold">Potential Profit: ₹{p.profit.toFixed(2)}</p>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <p>Added: {new Date(p.createdAt).toLocaleDateString()}</p>
                    {p.lastUpdatedAt && <p>Updated: {new Date(p.lastUpdatedAt).toLocaleDateString()}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Total Profit */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-blue-600 text-white rounded p-4">
              <p className="text-lg">Total Inventory Profit</p>
              <p className="text-2xl font-bold">₹{totalProfit.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App

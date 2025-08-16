"use client"

import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { motion, AnimatePresence } from "framer-motion"

// Import icons from a CDN to keep everything in one file
// In a real project, you'd use lucide-react or another icon library
const Icons = {
  Package: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
      <polyline points="3.29 7 12 12 20.71 7"></polyline>
      <line x1="12" y1="22" x2="12" y2="12"></line>
    </svg>
  ),
  ShoppingCart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"></path>
    </svg>
  ),
  TrendingUp: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
    </svg>
  ),
  AlertTriangle: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  Edit3: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  ),
  Trash2: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  Plus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  BarChart3: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18"></path>
      <path d="M18 17V9"></path>
      <path d="M13 17V5"></path>
      <path d="M8 17v-3"></path>
    </svg>
  ),
  Calendar: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  DollarSign: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
    </svg>
  ),
  Eye: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  Save: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  X: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
}

const API_KEY = "jWrXVOAnXgu0drz24CSqNsTPiyx8dO88n1mOcb42GXNs2raQh8PcED7D" // Your Pexels API Key

const App = () => {
  // State for managing product data and form inputs
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
  const [selectedCategory, setSelectedCategory] = useState("") // For conditional rendering of size dropdown
  const [saleForm, setSaleForm] = useState({ name: "", quantity: "" }) // For selling products
  const [totalProfit, setTotalProfit] = useState(0) // Overall profit
  const [saleProfit, setSaleProfit] = useState(null) // Profit from the last sale
  const [monthlyViewProduct, setMonthlyViewProduct] = useState("") // For viewing monthly profit of a specific product
  const [categorySummary, setCategorySummary] = useState({}) // Summary of products per category
  const [editingProductIndex, setEditingProductIndex] = useState(null) // Index of the product being edited
  const [isLoading, setIsLoading] = useState(false) // Loading state for image fetching

  // Effect to fetch images from Pexels API based on product name
  useEffect(() => {
    const fetchImages = async () => {
      if (!form.name) return // Only fetch if a product name is entered
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
          setForm((prevForm) => ({ ...prevForm, image: "" })) // Clear image if no result found
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
  }, [form.name]) // Re-run when product name changes in the form

  // Effect to update category summary whenever the products list changes
  useEffect(() => {
    const summary = {}
    products.forEach((p) => {
      summary[p.category] = (summary[p.category] || 0) + 1
    })
    setCategorySummary(summary)
  }, [products]) // Re-run when products array changes

  // Handles adding a new product to the inventory
  const handleAddProduct = () => {
    // Basic validation for form fields
    if (!form.name || !form.buy || !form.sell || !form.stock || !form.category) {
      toast.error("Please fill all product fields.")
      return
    }
    if (isNaN(form.buy) || isNaN(form.sell) || isNaN(form.stock)) {
      toast.error("Buying Price, Selling Price, and Stock must be numbers.")
      return
    }
    const profit = (Number.parseFloat(form.sell) - Number.parseFloat(form.buy)) * Number.parseInt(form.stock)
    const now = new Date().toISOString() // Get current timestamp
    const newProduct = {
      ...form,
      buy: Number.parseFloat(form.buy), // Ensure numeric
      sell: Number.parseFloat(form.sell), // Ensure numeric
      stock: Number.parseInt(form.stock), // Ensure numeric
      profit: profit,
      originalStock: Number.parseInt(form.stock), // Store original stock for monthly profit view
      createdAt: now, // Timestamp for when added
      lastUpdatedAt: now, // Initialize last updated date
      sales: [], // Array to track individual sales for this product
    }
    setProducts([...products, newProduct])
    setTotalProfit(totalProfit + profit)
    toast.success("Product added successfully!")
    // Reset form after adding
    setForm({
      name: "",
      buy: "",
      sell: "",
      stock: "",
      category: "",
      size: "",
      image: "",
    })
    setSelectedCategory("") // Reset selected category
  }

  // Handles deleting a product from the inventory
  const handleDelete = (index) => {
    const updatedProducts = [...products]
    const productToDelete = updatedProducts[index]
    // Subtract the profit of the deleted product from the total profit
    setTotalProfit(totalProfit - productToDelete.profit)
    updatedProducts.splice(index, 1) // Remove the product at the given index
    setProducts(updatedProducts)
    toast.info("Product deleted.")
  }

  // Handles processing a sale
  const handleSale = () => {
    if (!saleForm.name || !saleForm.quantity) {
      toast.error("Please select a product and enter quantity for sale.") // Updated message
      return
    }
    const productIndex = products.findIndex((p) => p.name === saleForm.name)
    if (productIndex === -1) {
      toast.error("Product not found. Please select from the list.") // Updated message
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
    const now = new Date().toISOString() // Get current timestamp for sale update
    // Update product stock and profit
    updatedProducts[productIndex] = {
      ...productToSale,
      stock: productToSale.stock - quantitySold,
      profit: productToSale.profit - soldProfit, // Reduce potential profit from remaining stock
      lastUpdatedAt: now, // Update last updated date when stock changes due to sale
      sales: [...productToSale.sales, { quantity: quantitySold, profit: soldProfit, date: now }],
    }
    setProducts(updatedProducts)
    setTotalProfit(totalProfit + soldProfit) // Add profit from this specific sale to total
    setSaleProfit(soldProfit) // Display profit for the current sale
    toast.success(`Sale of ${quantitySold} ${productToSale.name}(s) processed!`)
    // Reset sale form
    setSaleForm({ name: "", quantity: "" })
  }

  // Renders monthly profit, original stock, remaining stock, and sold quantity for a product
  const renderMonthlyProfit = (product) => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlySales = product.sales.filter(
      (sale) => new Date(sale.date).getMonth() === currentMonth && new Date(sale.date).getFullYear() === currentYear,
    )
    const monthlyProfit = monthlySales.reduce((sum, s) => sum + s.profit, 0)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 w-4 h-4">
                <Icons.Package />
              </span>
              <span className="font-medium text-gray-700">Original Stock:</span>
              <span className="font-bold text-blue-600">{product.originalStock}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-600 w-4 h-4">
                <Icons.AlertTriangle />
              </span>
              <span className="font-medium text-gray-700">Remaining:</span>
              <span className="font-bold text-orange-600">{product.stock}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-600 w-4 h-4">
                <Icons.ShoppingCart />
              </span>
              <span className="font-medium text-gray-700">Sold:</span>
              <span className="font-bold text-green-600">{product.originalStock - product.stock}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 w-4 h-4">
                <Icons.DollarSign />
              </span>
              <span className="font-medium text-gray-700">Monthly Profit:</span>
              <span className="font-bold text-purple-600">₹{monthlyProfit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Sets up the form for editing a specific product
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
    setEditingProductIndex(index) // Set the index of the product being edited
  }

  // Saves the changes made to an edited product
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
    // Check if stock has actually changed
    const stockChanged = Number.parseInt(form.stock) !== oldProduct.stock
    const now = new Date().toISOString() // Get current timestamp for update
    // Recalculate profit based on new buy/sell/stock values
    const newProfit = (Number.parseFloat(form.sell) - Number.parseFloat(form.buy)) * Number.parseInt(form.stock)
    // Update the total profit: subtract old product's profit, then add new product's profit
    setTotalProfit(totalProfit - oldProduct.profit + newProfit)
    // Update the product in the array
    updatedProducts[editingProductIndex] = {
      ...form,
      buy: Number.parseFloat(form.buy),
      sell: Number.parseFloat(form.sell),
      stock: Number.parseInt(form.stock),
      profit: newProfit,
      originalStock: oldProduct.originalStock, // Preserve original stock as it was when added
      createdAt: oldProduct.createdAt, // Preserve original creation date
      lastUpdatedAt: stockChanged ? now : oldProduct.lastUpdatedAt, // Update last updated only if stock changed
      sales: oldProduct.sales, // Preserve existing sales data
    }
    setProducts(updatedProducts)
    setEditingProductIndex(null) // Exit edit mode
    toast.success("Product updated successfully!")
    // Reset form
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* CSS Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #333;
          line-height: 1.5;
        }
        
        /* Custom Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.5);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.7);
        }
        
        /* Form Element Styles */
        input, select, textarea {
          transition: all 0.2s ease;
        }
        
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        /* Button Hover Effects */
        button {
          position: relative;
          overflow: hidden;
        }
        
        button::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }
        
        button:focus:not(:active)::after {
          animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
          0% { transform: scale(0, 0); opacity: 0.5; }
          100% { transform: scale(20, 20); opacity: 0; }
        }
        
        /* Toast Customization */
        .Toastify__toast {
          border-radius: 12px !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
        
        .Toastify__toast--success {
          background: linear-gradient(to right, #10b981, #059669) !important;
        }
        
        .Toastify__toast--error {
          background: linear-gradient(to right, #ef4444, #dc2626) !important;
        }
        
        .Toastify__toast--info {
          background: linear-gradient(to right, #3b82f6, #2563eb) !important;
        }
        
        .Toastify__toast--warning {
          background: linear-gradient(to right, #f59e0b, #d97706) !important;
        }
        
        /* Mobile-first responsive utility classes */
        .min-h-screen { min-height: 100vh; }
        .bg-gradient-to-br { background: linear-gradient(to bottom right, #f8fafc, #e0e7ff, #e0e7ff); }
        .bg-white { background-color: white; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .border-b { border-bottom: 1px solid; }
        .border-gray-200 { border-color: #e5e7eb; }
        .max-w-7xl { max-width: 80rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-5 { padding: 1.25rem; }
        .p-6 { padding: 1.5rem; }
        .bg-gradient-to-r { background: linear-gradient(to right, var(--tw-gradient-stops)); }
        .from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
        .to-indigo-600 { --tw-gradient-to: #4f46e5; }
        .rounded-full { border-radius: 9999px; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .w-4 { width: 1rem; }
        .w-5 { width: 1.25rem; }
        .w-6 { width: 1.5rem; }
        .w-8 { width: 2rem; }
        .w-16 { width: 4rem; }
        .w-full { width: 100%; }
        .h-4 { height: 1rem; }
        .h-5 { height: 1.25rem; }
        .h-6 { height: 1.5rem; }
        .h-8 { height: 2rem; }
        .h-16 { height: 4rem; }
        .h-32 { height: 8rem; }
        .h-48 { height: 12rem; }
        .text-white { color: white; }
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-base { font-size: 1rem; line-height: 1.5rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
        .text-transparent { color: transparent; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-8 { margin-top: 2rem; }
        .ml-1 { margin-left: 0.25rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .border { border-width: 1px; }
        .border-2 { border-width: 2px; }
        .border-t { border-top-width: 1px; }
        .border-gray-100 { border-color: #f3f4f6; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-blue-200 { border-color: #bfdbfe; }
        .border-blue-500 { border-color: #3b82f6; }
        .border-green-200 { border-color: #a7f3d0; }
        .border-purple-100 { border-color: #ede9fe; }
        .border-t-transparent { border-top-color: transparent; }
        .overflow-hidden { overflow: hidden; }
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-y-3 > * + * { margin-top: 0.75rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .right-4 { right: 1rem; }
        .top-4 { top: 1rem; }
        .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
        .focus\\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
        .focus\\:ring-blue-500:focus { --tw-ring-color: #3b82f6; }
        .focus\\:ring-green-500:focus { --tw-ring-color: #10b981; }
        .focus\\:ring-purple-500:focus { --tw-ring-color: #8b5cf6; }
        .focus\\:border-transparent:focus { border-color: transparent; }
        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .duration-200 { transition-duration: 200ms; }
        .duration-300 { transition-duration: 300ms; }
        .from-green-600 { --tw-gradient-from: #059669; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5, 150, 105, 0)); }
        .to-emerald-600 { --tw-gradient-to: #059669; }
        .from-green-50 { --tw-gradient-from: #ecfdf5; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(236, 253, 245, 0)); }
        .to-emerald-50 { --tw-gradient-to: #ecfdf5; }
        .from-purple-600 { --tw-gradient-from: #7c3aed; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(124, 58, 237, 0)); }
        .to-pink-600 { --tw-gradient-to: #db2777; }
        .from-purple-50 { --tw-gradient-from: #f5f3ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(245, 243, 255, 0)); }
        .to-pink-50 { --tw-gradient-to: #fdf2f8; }
        .from-indigo-600 { --tw-gradient-from: #4f46e5; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(79, 70, 229, 0)); }
        .to-purple-600 { --tw-gradient-to: #7c3aed; }
        .from-yellow-500 { --tw-gradient-from: #f59e0b; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(245, 158, 11, 0)); }
        .to-orange-500 { --tw-gradient-to: #f97316; }
        .from-red-500 { --tw-gradient-from: #ef4444; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 68, 68, 0)); }
        .to-pink-500 { --tw-gradient-to: #ec4899; }
        .from-white { --tw-gradient-from: #ffffff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0)); }
        .to-gray-50 { --tw-gradient-to: #f9fafb; }
        .from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0)); }
        .to-indigo-50 { --tw-gradient-to: #eef2ff; }
        .bg-gradient-to-t { background: linear-gradient(to top, var(--tw-gradient-stops)); }
        .from-black\\/20 { --tw-gradient-from: rgba(0, 0, 0, 0.2); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0)); }
        .to-transparent { --tw-gradient-to: transparent; }
        .bg-white\\/20 { background-color: rgba(255, 255, 255, 0.2); }
        .backdrop-blur-sm { backdrop-filter: blur(4px); }
        .text-center { text-align: center; }
        .text-green-700 { color: #047857; }
        .text-gray-800 { color: #1f2937; }
        .text-gray-700 { color: #374151; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-400 { color: #9ca3af; }
        .text-gray-300 { color: #d1d5db; }
        .text-gray-900 { color: #111827; }
        .text-purple-600 { color: #7c3aed; }
        .text-blue-600 { color: #2563eb; }
        .text-orange-600 { color: #ea580c; }
        .text-red-600 { color: #dc2626; }
        .text-green-600 { color: #059669; }
        .bg-purple-600 { background-color: #7c3aed; }
        .bg-gray-500 { background-color: #6b7280; }
        .italic { font-style: italic; }
        .capitalize { text-transform: capitalize; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .pt-2 { padding-top: 0.5rem; }
        .pt-3 { padding-top: 0.75rem; }
        .pt-4 { padding-top: 1rem; }
        .pt-6 { padding-top: 1.5rem; }
        .flex-1 { flex: 1 1 0%; }
        .object-cover { object-fit: cover; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .inline-block { display: inline-block; }
        .opacity-90 { opacity: 0.9; }
        .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .hover\\:scale-110:hover { --tw-scale-x: 1.1; --tw-scale-y: 1.1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
        .hover\\:from-green-700:hover { --tw-gradient-from: #047857; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(4, 120, 87, 0)); }
        .hover\\:to-emerald-700:hover { --tw-gradient-to: #047857; }
        .hover\\:from-blue-700:hover { --tw-gradient-from: #1d4ed8; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(29, 78, 216, 0)); }
        .hover\\:to-indigo-700:hover { --tw-gradient-to: #3730a3; }
        .hover\\:from-yellow-600:hover { --tw-gradient-from: #d97706; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(217, 119, 6, 0)); }
        .hover\\:to-orange-600:hover { --tw-gradient-to: #ea580c; }
        .hover\\:from-red-600:hover { --tw-gradient-from: #dc2626; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(220, 38, 38, 0)); }
        .hover\\:to-pink-600:hover { --tw-gradient-to: #db2777; }
        .hover\\:bg-gray-600:hover { background-color: #4b5563; }
        
        /* Mobile responsive classes */
        @media (min-width: 640px) {
          .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .sm\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .sm\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        }
        
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
          .md\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .md\\:text-5xl { font-size: 3rem; line-height: 1; }
        }
        
        @media (min-width: 1024px) {
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
        }
        
        /* Touch-friendly buttons for mobile */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            padding: 12px 16px;
          }
          
          input, select {
            min-height: 44px;
            padding: 12px 16px;
          }
          
          .text-4xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .text-3xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .text-2xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            >
              <span className="w-6 h-6 sm:w-8 sm:h-8 text-white block">
                <Icons.Package />
              </span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center">
              Taj Enterprises Inventory
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Add/Edit Product Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                {editingProductIndex !== null ? (
                  <span className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                    <Icons.Edit3 />
                  </span>
                ) : (
                  <span className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                    <Icons.Plus />
                  </span>
                )}
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {editingProductIndex !== null ? "Edit Product" : "Add New Product"}
                </h2>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                />
                {isLoading && (
                  <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="number"
                  placeholder="Buying Price (₹)"
                  value={form.buy}
                  onChange={(e) => setForm({ ...form, buy: e.target.value })}
                  className="p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                />
                <input
                  type="number"
                  placeholder="Selling Price (₹)"
                  value={form.sell}
                  onChange={(e) => setForm({ ...form, sell: e.target.value })}
                  className="p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                />
              </div>

              <input
                type="number"
                placeholder="Stock Quantity"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
              />

              <select
                value={form.category}
                onChange={(e) => {
                  setForm({ ...form, category: e.target.value, size: "" })
                  setSelectedCategory(e.target.value)
                }}
                className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-base"
              >
                <option value="">Select Category</option>
                <option value="colddrink">Cold Drink</option>
                <option value="bakery">Bakery</option>
              </select>

              <AnimatePresence>
                {selectedCategory === "colddrink" && (
                  <motion.select
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-base"
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
                  </motion.select>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {editingProductIndex !== null ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveEdit}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 text-base"
                    >
                      <span className="w-4 h-4 sm:w-5 sm:h-5">
                        <Icons.Save />
                      </span>
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={cancelEdit}
                      className="px-4 bg-gray-500 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
                    >
                      <span className="w-4 h-4 sm:w-5 sm:h-5">
                        <Icons.X />
                      </span>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddProduct}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 text-base"
                  >
                    <span className="w-4 h-4 sm:w-5 sm:h-5">
                      <Icons.Plus />
                    </span>
                    Add Product
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sell Product Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                  <Icons.ShoppingCart />
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">Sell Product</h2>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <select
                value={saleForm.name}
                onChange={(e) => setSaleForm({ ...saleForm, name: e.target.value })}
                className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-base"
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
                className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-base"
                min="1"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSale}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 text-base"
              >
                <span className="w-4 h-4 sm:w-5 sm:h-5">
                  <Icons.ShoppingCart />
                </span>
                Process Sale
              </motion.button>

              <AnimatePresence>
                {saleProfit !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-base sm:text-lg">
                      <span className="w-4 h-4 sm:w-5 sm:h-5">
                        <Icons.TrendingUp />
                      </span>
                      Profit from last sale: ₹{saleProfit.toFixed(2)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Dashboard Insights Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                  <Icons.BarChart3 />
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white">Dashboard Insights</h2>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600">
                    <Icons.Package />
                  </span>
                  Category Overview
                </h3>
                {Object.keys(categorySummary).length === 0 ? (
                  <p className="text-gray-500 italic text-center py-4 text-sm sm:text-base">No products added yet</p>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(categorySummary).map(([cat, count], i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                      >
                        <span className="font-medium capitalize text-gray-700 text-sm sm:text-base">{cat}</span>
                        <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                          {count}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600">
                    <Icons.Calendar />
                  </span>
                  Monthly Performance
                </h3>
                <select
                  onChange={(e) => setMonthlyViewProduct(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white text-base"
                >
                  <option value="">Select Product to View</option>
                  {products.map((p, i) => (
                    <option key={i} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <AnimatePresence>
                  {products
                    .filter((p) => p.name === monthlyViewProduct)
                    .map((p, i) => (
                      <div key={i}>{renderMonthlyProfit(p)}</div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Inventory Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                  <Icons.Eye />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Current Inventory</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-1 sm:py-2">
                <span className="text-white font-semibold text-sm sm:text-base">{products.length} Products</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {products.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 sm:py-16">
                <span className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4 block">
                  <Icons.Package />
                </span>
                <p className="text-gray-500 text-base sm:text-lg">No products in inventory</p>
                <p className="text-gray-400 text-sm sm:text-base">Start by adding your first product!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <AnimatePresence>
                  {products.map((p, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {p.image && (
                        <div className="relative h-32 sm:h-48 overflow-hidden">
                          <img
                            src={p.image || "/placeholder.svg"}
                            alt={p.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      )}

                      <div className="p-4 sm:p-5 space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{p.name}</h3>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="space-y-1">
                            <p className="text-gray-600">
                              <span className="font-medium">Buy:</span> ₹{p.buy.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Sell:</span> ₹{p.sell.toFixed(2)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-600 flex items-center gap-1">
                              <span className="font-medium">Stock:</span>
                              <span
                                className={`font-bold ${p.stock <= 5 && p.stock > 0 ? "text-orange-600" : p.stock === 0 ? "text-red-600" : "text-green-600"}`}
                              >
                                {p.stock}
                              </span>
                              {p.stock <= 5 && p.stock > 0 && (
                                <span className="w-4 h-4 text-orange-600">
                                  <Icons.AlertTriangle />
                                </span>
                              )}
                              {p.stock === 0 && (
                                <span className="w-4 h-4 text-red-600">
                                  <Icons.AlertTriangle />
                                </span>
                              )}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Category:</span>
                              <span className="capitalize ml-1">{p.category}</span>
                            </p>
                          </div>
                        </div>

                        {p.size && (
                          <p className="text-gray-600 text-sm">
                            <span className="font-medium">Size:</span> {p.size}
                          </p>
                        )}

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                          <p className="text-green-700 font-bold text-center flex items-center justify-center gap-2 text-sm sm:text-base">
                            <span className="w-4 h-4">
                              <Icons.DollarSign />
                            </span>
                            Potential Profit: ₹{p.profit.toFixed(2)}
                          </p>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-100">
                          <p>Added: {new Date(p.createdAt).toLocaleDateString()}</p>
                          {p.lastUpdatedAt && <p>Updated: {new Date(p.lastUpdatedAt).toLocaleDateString()}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(index)}
                            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <span className="w-4 h-4">
                              <Icons.Edit3 />
                            </span>
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(index)}
                            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <span className="w-4 h-4">
                              <Icons.Trash2 />
                            </span>
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Total Profit Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 sm:mt-8 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white">
                  <span className="w-6 h-6 sm:w-8 sm:h-8">
                    <Icons.TrendingUp />
                  </span>
                  <div className="text-center sm:text-left">
                    <p className="text-base sm:text-lg font-medium opacity-90">Total Inventory Profit</p>
                    <p className="text-2xl sm:text-3xl font-bold">₹{totalProfit.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
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
        toastStyle={{
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  )
}

export default App

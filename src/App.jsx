import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Sparkles, Heart, Star, Smile, Brain, Users } from 'lucide-react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Small Picky Pad',
    price: 5,
    size: 'Small',
    description: 'Perfect pocket-sized fidget fun! Great for on-the-go stress relief.',
    colors: ['#4EC5F1', '#FF6B9D', '#7ED957', '#FFE066', '#FFB347'],
    image: 'small'
  },
  {
    id: 2,
    name: 'Large Picky Pad',
    price: 15,
    size: 'Large',
    description: 'More bubbles, more fun! The ultimate desktop fidget companion.',
    colors: ['#9B7ED9', '#4EC5F1', '#FF6B9D', '#7ED957', '#FFE066'],
    image: 'large'
  },
  {
    id: 3,
    name: 'Customize Your Own!',
    price: 15,
    size: 'Custom',
    description: 'Design your dream Picky Pad! Choose your colors, themes, and make it uniquely yours.',
    colors: ['rainbow'],
    image: 'custom',
    isCustom: true
  }
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customNote, setCustomNote] = useState('')

  const addToCart = (product, note = '') => {
    const existingItem = cart.find(item => item.id === product.id && item.note === note)
    if (existingItem && !product.isCustom) {
      setCart(cart.map(item =>
        item.id === product.id && item.note === note
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1, note, cartId: Date.now() }])
    }
    setIsCartOpen(true)
  }

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo-container">
            <span className="logo-text">What's Poppin!</span>
            <span className="logo-subtitle">Picky Pads</span>
          </div>
          <div className="nav-links">
            <a href="#products">Shop</a>
            <a href="#about">About</a>
            <button className="cart-button" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="sparkles">
          <Sparkles className="sparkle s1" />
          <Star className="sparkle s2" />
          <Sparkles className="sparkle s3" />
          <Star className="sparkle s4" />
          <Sparkles className="sparkle s5" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="pop-text">What's</span>
            <span className="pop-text accent">Poppin!</span>
          </h1>
          <p className="hero-subtitle">Fidget toys that pop with personality</p>
          <p className="hero-description">
            Discover the joy of Picky Pads - the satisfying, stress-relieving fidget toys
            that everyone loves! Perfect for ages 6 and up.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary">Shop Now</a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="picky-pad-demo">
            <div className="bubble-grid">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`bubble bubble-${i % 5}`} style={{animationDelay: `${i * 0.1}s`}} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <h2 className="section-title">
          <Sparkles className="title-icon" />
          Our Picky Pads
          <Sparkles className="title-icon" />
        </h2>
        <p className="section-subtitle">Find your perfect pop!</p>

        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              customNote={customNote}
              setCustomNote={setCustomNote}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="section-title">
          <Heart className="title-icon" />
          What are Picky Pads?
          <Heart className="title-icon" />
        </h2>

        <div className="about-content">
          <div className="about-intro">
            <p>
              Picky Pads are the ultimate fidget toy experience! These bubble-popping
              sensory toys provide endless satisfaction with their soft, silicone bubbles
              that you can push and pop again and again.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Smile size={40} />
              </div>
              <h3>Stress Relief</h3>
              <p>The repetitive popping motion is incredibly calming and helps reduce anxiety and stress throughout your day.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Brain size={40} />
              </div>
              <h3>Focus & Concentration</h3>
              <p>Keep your hands busy while your mind stays sharp! Perfect for studying, meetings, or any time you need to focus.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Users size={40} />
              </div>
              <h3>Ages 6+</h3>
              <p>Kids and adults alike love the satisfying pop! Great for sensory play and fine motor skill development. Not for children under 6 due to small parts.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Star size={40} />
              </div>
              <h3>Fun Games</h3>
              <p>Play pop races with friends, use it for counting games, or simply enjoy the satisfying sensory experience!</p>
            </div>
          </div>

          <div className="fun-facts">
            <h3>Did You Know?</h3>
            <ul>
              <li>Picky Pads are made from safe, durable silicone</li>
              <li>They're reusable - just flip and pop again!</li>
              <li>Perfect for quiet fidgeting in classrooms or offices</li>
              <li>Recommended for ages 6+ (small parts - choking hazard)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section id="founder" className="founder-section">
        <h2 className="section-title">
          <Star className="title-icon" />
          Meet the Founder
          <Star className="title-icon" />
        </h2>

        <div className="founder-content">
          <div className="founder-avatar">
            <div className="avatar-circle">
              <span>AS</span>
            </div>
            <div className="avatar-decorations">
              <span className="mini-bear">🧸</span>
              <Sparkles className="founder-sparkle" />
            </div>
          </div>

          <div className="founder-info">
            <h3>Aliana Serpas</h3>
            <p className="founder-title">Founder & Creator, Age 10</p>
            <p className="founder-story">
              Aliana grew up loving fidget toys, and one day decided to create one herself!
              What started as a fun project turned into What's Poppin! - bringing joy to
              kids and adults everywhere with colorful, satisfying Picky Pads.
            </p>
            <p className="founder-mission">
              <Heart size={16} className="heart-icon" />
              All proceeds go towards Aliana's college education fund.
            </p>
            <p className="founder-fun-fact">
              <span className="fun-fact-label">Fun Fact:</span> Her favorite gem in the Picky Pad is the mini-bears! 🧸
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">What's Poppin!</span>
            <p>Bringing joy, one pop at a time!</p>
          </div>
          <div className="footer-links">
            <a href="#products">Shop</a>
            <a href="#about">About</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 What's Poppin! Picky Pads. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={48} />
            <p>Your cart is empty</p>
            <p className="cart-empty-hint">Add some Picky Pads to get poppin'!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.cartId} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">${item.price} each</p>
                    {item.note && <p className="cart-item-note">Note: {item.note}</p>}
                  </div>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQuantity(item.cartId, -1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.cartId)}>
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">${cartTotal}</span>
              </div>
              <button className="checkout-btn">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product, onAddToCart, customNote, setCustomNote }) {
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [localNote, setLocalNote] = useState('')

  const handleAddToCart = () => {
    if (product.isCustom) {
      setShowCustomForm(true)
    } else {
      onAddToCart(product)
    }
  }

  const handleCustomSubmit = () => {
    onAddToCart(product, localNote)
    setLocalNote('')
    setShowCustomForm(false)
  }

  return (
    <div className={`product-card ${product.isCustom ? 'custom-card' : ''}`}>
      <div className={`product-image ${product.image}`}>
        <div className="product-bubbles">
          {[...Array(product.isCustom ? 12 : 9)].map((_, i) => (
            <div
              key={i}
              className="product-bubble"
              style={{
                backgroundColor: product.isCustom
                  ? `hsl(${i * 30}, 70%, 60%)`
                  : product.colors[i % product.colors.length]
              }}
            />
          ))}
        </div>
        {product.isCustom && <Sparkles className="custom-sparkle" />}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-size">{product.size}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-colors">
          {!product.isCustom && product.colors.map((color, i) => (
            <span
              key={i}
              className="color-dot"
              style={{ backgroundColor: color }}
            />
          ))}
          {product.isCustom && (
            <span className="color-text">You choose the colors!</span>
          )}
        </div>
        <p className="product-price">${product.price}</p>

        {showCustomForm ? (
          <div className="custom-form">
            <textarea
              placeholder="Describe your dream Picky Pad! (colors, theme, etc.)"
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
            />
            <div className="custom-form-buttons">
              <button className="btn btn-secondary" onClick={() => setShowCustomForm(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCustomSubmit}>
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            {product.isCustom ? 'Design Yours!' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  )
}

export default App

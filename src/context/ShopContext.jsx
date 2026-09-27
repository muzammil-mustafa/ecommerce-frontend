import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import productsData from '../data/products.json';

const ShopContext = createContext();

const COUPONS = {
  'SAVE15': 0.15,
  'WELCOME10': 0.10,
  'VIP20': 0.20
};

export const ShopProvider = ({ children }) => {
  // Products
  const [products] = useState(productsData);

  // Active View ('home', 'shop')
  const [activeView, setActiveView] = useState('home');

  // Selected Product for Details Modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aurastore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aurastore_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Slide-over drawers & modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);

  // Orders list (saved in localStorage)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aurastore_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast Notification state
  const [toasts, setToasts] = useState([]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurastore_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurastore_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Failed to save wishlist to localStorage', err);
    }
  }, [wishlist]);

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurastore_orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save orders to localStorage', err);
    }
  }, [orders]);

  // Helper for adding toast notifications
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, color = null) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === (color || product.colors?.[0])
      );

      const targetColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : null);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            selectedColor: targetColor
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const updateQuantity = (productId, delta, color = null) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId && (!color || item.selectedColor === color)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const setItemQuantity = (productId, qty, color = null) => {
    if (qty <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId && (!color || item.selectedColor === color)) {
          return { ...item, quantity: Math.max(1, qty) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, color = null) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && (!color || item.selectedColor === color)))
    );
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon('');
    setCouponDiscountPercent(0);
    addToast('Cart cleared', 'info');
  };

  // Coupon application
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (COUPONS[cleanCode]) {
      setAppliedCoupon(cleanCode);
      setCouponDiscountPercent(COUPONS[cleanCode]);
      addToast(`Coupon "${cleanCode}" applied: ${(COUPONS[cleanCode] * 100)}% OFF!`, 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else {
      addToast('Invalid promo code. Try "SAVE15" or "WELCOME10"', 'error');
      return { success: false, message: 'Invalid promo code. Try "SAVE15"' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setCouponDiscountPercent(0);
    addToast('Coupon removed', 'info');
  };

  // Wishlist operations
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name}" to wishlist!`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    addToast('Removed from wishlist', 'info');
  };

  const moveWishlistToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return cartSubtotal * couponDiscountPercent;
  }, [cartSubtotal, couponDiscountPercent]);

  const discountedSubtotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount);
  }, [cartSubtotal, discountAmount]);

  // Free shipping above $75
  const freeShippingThreshold = 75;
  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    return discountedSubtotal >= freeShippingThreshold ? 0 : 9.99;
  }, [cart, discountedSubtotal]);

  const tax = useMemo(() => {
    return discountedSubtotal * 0.08; // 8% sales tax
  }, [discountedSubtotal]);

  const cartTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return discountedSubtotal + shippingCost + tax;
  }, [cart, discountedSubtotal, shippingCost, tax]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Order placement
  const placeOrder = (customerDetails) => {
    const newOrder = {
      orderId: 'AUR-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      tax: tax,
      total: cartTotal,
      customer: customerDetails,
      status: 'Processing'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon('');
    setCouponDiscountPercent(0);
    addToast('Order placed successfully!', 'success');
    return newOrder;
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // In stock only
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return 0; // 'featured' keeps original ordering
    });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy]);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(productsData.map((p) => p.category))];
    return cats;
  }, []);

  const value = {
    products,
    filteredProducts,
    categories,
    activeView,
    setActiveView,
    selectedProduct,
    setSelectedProduct,
    cart,
    addToCart,
    updateQuantity,
    setItemQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    discountAmount,
    discountedSubtotal,
    shippingCost,
    freeShippingThreshold,
    tax,
    cartTotal,
    cartCount,
    appliedCoupon,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    wishlist,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    moveWishlistToCart,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    viewMode,
    setViewMode,
    orders,
    placeOrder,
    toasts,
    addToast,
    removeToast
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

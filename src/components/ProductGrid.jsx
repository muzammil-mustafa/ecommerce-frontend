import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  Search,
  FilterX
} from 'lucide-react';

export const ProductGrid = () => {
  const {
    products,
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode
  } = useShop();

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 300]);
    setInStockOnly(false);
  };

  const isFiltered =
    selectedCategory !== 'All' ||
    searchQuery !== '' ||
    sortBy !== 'featured' ||
    priceRange[1] < 300 ||
    inStockOnly;

  return (
    <section className="product-grid-section" id="product-catalog">
      {/* Category Pills Navigation */}
      <div className="category-pills-bar">
        <div className="pills-scroll-container">
          {categories.map((category) => {
            const count = category === 'All'
              ? products.length
              : products.filter((p) => p.category === category).length;
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
                <span className="pill-badge">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="catalog-toolbar">
        {/* Left: Results Info */}
        <div className="toolbar-info">
          <h2 className="catalog-title">
            {selectedCategory === 'All' ? 'All Products' : `${selectedCategory}`}
          </h2>
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} items
          </span>
          {searchQuery && (
            <span className="search-query-tag">
              Matching "<strong>{searchQuery}</strong>"
              <button onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
            </span>
          )}
        </div>

        {/* Right: Controls & Sorting */}
        <div className="toolbar-controls">
          {/* Price Range Quick Filter */}
          <div className="filter-price-box">
            <span className="filter-label">Max: ${priceRange[1]}</span>
            <input
              type="range"
              min="30"
              max="300"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="price-slider"
              title={`Max price: $${priceRange[1]}`}
            />
          </div>

          {/* In Stock Toggle */}
          <label className="checkbox-toggle-label">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span className="checkbox-text">In Stock Only</span>
          </label>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrapper">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              title="List view"
            >
              <List size={18} />
            </button>
          </div>

          {/* Reset Filters button if any filter is active */}
          {isFiltered && (
            <button
              className="reset-filters-btn"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid or List of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className={`products-container ${viewMode === 'list' ? 'products-list-layout' : 'products-grid-layout'}`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-catalog-state">
          <div className="empty-icon-wrap">
            <FilterX size={48} />
          </div>
          <h3>No products match your criteria</h3>
          <p>Try broadening your search, removing filters, or resetting the price slider.</p>
          <button className="btn btn-primary" onClick={handleResetFilters}>
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};

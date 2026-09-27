import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import {
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
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
    <section className="morae-catalog-section" id="catalog">
      {/* Category Pills Strip */}
      <div className="morae-pills-bar">
        <div className="pills-scroll-track">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? products.length
              : products.filter((p) => p.category === cat).length;
            const active = selectedCategory === cat;

            return (
              <button
                key={cat}
                className={`morae-pill ${active ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat.toUpperCase()}</span>
                <span className="pill-num">[{count}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Control Toolbar */}
      <div className="morae-toolbar">
        {/* Left: Info */}
        <div className="toolbar-left-info">
          <h2 className="toolbar-section-title">
            {selectedCategory === 'All' ? 'ALL ARCHIVE RELEASES' : `${selectedCategory.toUpperCase()}`}
          </h2>
          <span className="mono-results-counter">
            SHOWING <strong>{filteredProducts.length}</strong> / {products.length} ITEMS
          </span>
          {searchQuery && (
            <span className="search-filter-tag">
              QUERY: "<strong>{searchQuery}</strong>"
              <button onClick={() => setSearchQuery('')} aria-label="Clear query">×</button>
            </span>
          )}
        </div>

        {/* Right: Controls */}
        <div className="toolbar-right-controls">
          {/* Price Range Slider */}
          <div className="morae-price-filter">
            <span className="filter-mono-label">MAX: ${priceRange[1]}</span>
            <input
              type="range"
              min="30"
              max="300"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="morae-slider"
              title={`Max price: $${priceRange[1]}`}
            />
          </div>

          {/* In Stock Toggle */}
          <label className="morae-checkbox-label">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span className="checkbox-mono-text">IN STOCK</span>
          </label>

          {/* Sort Selector */}
          <div className="morae-sort-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="morae-sort-select"
            >
              <option value="featured">[ SORT: FEATURED ]</option>
              <option value="price-asc">[ PRICE: LOW TO HIGH ]</option>
              <option value="price-desc">[ PRICE: HIGH TO LOW ]</option>
              <option value="rating">[ HIGHEST RATED ]</option>
              <option value="newest">[ NEWEST RELEASES ]</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="morae-view-toggle">
            <button
              className={`view-icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Grid layout"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`view-icon-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              title="List layout"
            >
              <List size={16} />
            </button>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              className="morae-reset-btn"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>RESET</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid or List of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className={`morae-products-wrapper ${viewMode === 'list' ? 'layout-list' : 'layout-grid'}`}>
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
        <div className="morae-empty-catalog">
          <div className="empty-icon-ring">
            <FilterX size={44} />
          </div>
          <h3>NO HARDWARE MATCHES CRITERIA</h3>
          <p>Adjust your search query or reset the price slider to discover available releases.</p>
          <button className="btn btn-primary" onClick={handleResetFilters}>
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import { products, Product } from '../../data/products';

const Container = styled.div`
  padding: 40px 0;
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  font-family: 'Times New Roman', serif;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 20px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#c49a6c' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#c49a6c' : '#e0e0e0'};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#b38a5c' : '#f8f2ea'};
    border-color: ${props => props.active ? '#b38a5c' : '#c49a6c'};
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const SortSelect = styled.select`
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 10px;
`;

const PageButton = styled.button<{ active: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.active ? '#c49a6c' : '#e0e0e0'};
  background-color: ${props => props.active ? '#c49a6c' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#b38a5c' : '#f8f2ea'};
    border-color: #c49a6c;
  }
`;

const ListProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const categories = ['All', 'Classic Collection', 'Seasonal', 'Gift Sets'];
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [activeCategory, sortBy]);
  
  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <Container>
      <Header>
        <Title>Our Luxury Candle Collection</Title>
        <Description>
          Each of our hand-poured candles is crafted with natural ingredients and premium scents to create an exceptional ambiance in your home.
        </Description>
      </Header>
      
      <FiltersContainer>
        <CategoryFilters>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </CategoryFilters>
        
        <SortContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
          </SortSelect>
        </SortContainer>
      </FiltersContainer>
      
      <ProductGrid>
        {currentProducts.map(product => (
          <div key={product.id}>
            <ProductCard 
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              discountPercentage={product.discountPercentage}
            />
          </div>
        ))}
      </ProductGrid>
      
      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PageButton
              key={page}
              active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default ListProducts;

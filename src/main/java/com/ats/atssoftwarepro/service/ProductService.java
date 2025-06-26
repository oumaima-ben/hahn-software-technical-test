package com.ats.atssoftwarepro.service;

import com.ats.atssoftwarepro.dto.ProductRecord;

import java.util.List;

public interface ProductService {
    ProductRecord createProduct(ProductRecord productDto);
    List<ProductRecord> getAllProducts();
    ProductRecord getProductById(Long id);
    ProductRecord updateProduct(Long id, ProductRecord productDto);
    void deleteProduct(Long id);
}

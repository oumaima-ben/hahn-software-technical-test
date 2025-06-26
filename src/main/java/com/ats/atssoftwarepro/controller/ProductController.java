package com.ats.atssoftwarepro.controller;

import com.ats.atssoftwarepro.dto.ProductRecord;
import com.ats.atssoftwarepro.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "APIs for managing products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;


    @Operation(summary = "Get a list of all products (Public)")
    @GetMapping
    public ResponseEntity<List<ProductRecord>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @Operation(summary = "Get a single product by its ID (Public)")
    @GetMapping("/{id}")
    public ResponseEntity<ProductRecord> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @Operation(summary = "Create a new product (ADMIN only)")
    @SecurityRequirement(name = "jwtAuth")
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductRecord> createProduct(@Valid @RequestBody ProductRecord productDto) {
        return new ResponseEntity<>(productService.createProduct(productDto), HttpStatus.CREATED);
    }

    @Operation(summary = "Update an existing product (ADMIN only)")
    @SecurityRequirement(name = "jwtAuth")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductRecord> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRecord productDto) {
        return ResponseEntity.ok(productService.updateProduct(id, productDto));
    }

    @Operation(summary = "Delete a product (ADMIN only)")
    @SecurityRequirement(name = "jwtAuth")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}

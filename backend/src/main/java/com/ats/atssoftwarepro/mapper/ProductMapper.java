package com.ats.atssoftwarepro.mapper;


import com.ats.atssoftwarepro.dto.ProductRecord;
import com.ats.atssoftwarepro.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductRecord toDto(Product product);
    Product toEntity(ProductRecord productDto);
}

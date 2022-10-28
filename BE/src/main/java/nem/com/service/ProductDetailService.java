package nem.com.service;

import nem.com.dto.response.ProductViewDto;
import nem.com.entity.ProductsDetails;

import java.util.List;

public interface ProductDetailService {

    List<ProductsDetails> getAll();

    ProductsDetails getOne(Integer id);

    ProductsDetails update(ProductsDetails productsDetails);

    void delete(Integer id);

    ProductsDetails save(ProductsDetails productsDetails);

    List<ProductsDetails> findProductsDetailsByProductId(Integer productId);

    ProductsDetails findProductDetailBySizeAndColor(Integer productId, Integer sizeId, Integer colorId);
    List<ProductViewDto> createProductDetails(List<ProductViewDto> list);

    List<ProductsDetails> findProductDetailByProductSizeColor(ProductViewDto productViewDto);
}

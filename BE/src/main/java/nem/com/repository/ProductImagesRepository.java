package nem.com.repository;

import nem.com.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImagesRepository extends JpaRepository<ProductImages, Integer> {
}
package nem.com.dto.request;

import nem.com.entity.Colors;
import nem.com.entity.Products;
import nem.com.entity.Sizes;
import java.util.List;

public class ProductDetailsDTO {
    private Integer id;

    private Integer quantity;

    private Integer colorId;

    private String nameColor;

    private Integer sizeId;

    private String nameSize;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getColorId() {
        return colorId;
    }

    public void setColorId(Integer colorId) {
        this.colorId = colorId;
    }

    public String getNameColor() {
        return nameColor;
    }

    public void setNameColor(String nameColor) {
        this.nameColor = nameColor;
    }

    public Integer getSizeId() {
        return sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public String getNameSize() {
        return nameSize;
    }

    public void setNameSize(String nameSize) {
        this.nameSize = nameSize;
    }
}

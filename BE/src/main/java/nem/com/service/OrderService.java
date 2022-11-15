package nem.com.service;

import nem.com.entity.Orders;
import java.util.List;

public interface OrderService {
    List<Orders> getAll();

    List<Orders> findByStatusOrderByCreateDateDesc(Integer status);
    List<Orders> getAllOrderSort();
    Orders verifyOrCancel(Orders orders, Integer f);

    List<Orders> getOrderGhn();
}

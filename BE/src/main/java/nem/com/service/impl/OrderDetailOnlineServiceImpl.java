package nem.com.service.impl;

import lombok.RequiredArgsConstructor;
import nem.com.entity.OrderDetails;
import nem.com.repository.OrderDetailsRepository;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderDetailOnlineService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailOnlineServiceImpl implements OrderDetailOnlineService {

    private final OrderDetailsRepository orderDetailsRepository;

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    public OrderDetails save(OrderDetails request) {
        return this.orderDetailsRepository.save(request);
    }

    @Override
    public List<OrderDetails> findAllOrderDetail( Integer id ) {
        return this.orderDetailsRepository.getOrderDetailsById(id);
    }

    @Override
    public List<OrderDetails> findAllOrderDetailByCustomeAndOrder(Long idOrder, Integer idCustome) {
        return this.orderDetailsRepository.getOrderDetailsByByIdOrder( idOrder , idCustome );
    }

    @Override
    public List<OrderDetails> findOrderDetailByOrder(Long id) {
        return this.orderDetailsRepository.getOrderDetailsByOrder(id) ;
    }
}
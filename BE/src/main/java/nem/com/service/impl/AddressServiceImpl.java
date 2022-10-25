package nem.com.service.impl;

import nem.com.entity.Address;
import nem.com.repository.AddressRepository;
import nem.com.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private  final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> getAll() {
        return this.addressRepository.findAll();
    }

    @Override
    public Address getOne(Integer id) {
        return this.addressRepository.findById(id).get();
    }

    @Override
    public Address save(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public void delete(Integer id) {
        this.addressRepository.deleteById(id);
    }
}

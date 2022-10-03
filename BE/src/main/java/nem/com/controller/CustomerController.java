package nem.com.controller;

import nem.com.entity.Customers;
import nem.com.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<Customers>> getAll() {
        return new ResponseEntity<>(customerService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Customers> get(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(customerService.get(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Customers> save(@RequestBody Customers customer) {
        return new ResponseEntity<>(customerService.save(customer), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Customers> update(@RequestBody Customers customer) {
        return new ResponseEntity<>(customerService.update(customer), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        customerService.delete(id);
    }
}
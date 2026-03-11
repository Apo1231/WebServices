package com.example.demo.service;

import com.example.demo.model.Producto;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final List<Producto> productos = Arrays.asList(
        new Producto(1L, "Laptop",   15000.0),
        new Producto(2L, "Teclado",    800.0),
        new Producto(3L, "Monitor",   5000.0)
    );

    public List<Producto> obtenerTodos() {
        return productos;
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return productos.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }
}

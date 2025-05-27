package com.pruebajr.backend.service;

import com.pruebajr.backend.model.ListaReproduccion;
import com.pruebajr.backend.repository.ListaReproduccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ListaReproduccionService {

    @Autowired
    private ListaReproduccionRepository repo;

    public ListaReproduccion crearLista(ListaReproduccion lista) {
        if (lista.getNombre() == null || lista.getNombre().isBlank()) {
            throw new IllegalArgumentException("Nombre inválido");
        }
        return repo.save(lista);
    }

    public List<ListaReproduccion> obtenerTodas() {
        return repo.findAll();
    }

    public Optional<ListaReproduccion> obtenerPorNombre(String nombre) {
        return repo.findById(nombre);
    }

    public void eliminar(String nombre) {
        if (!repo.existsById(nombre)) {
            throw new NoSuchElementException("Lista no encontrada");
        }
        repo.deleteById(nombre);
    }
}

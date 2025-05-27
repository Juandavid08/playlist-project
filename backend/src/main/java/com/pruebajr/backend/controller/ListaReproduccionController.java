package com.pruebajr.backend.controller;

import com.pruebajr.backend.model.ListaReproduccion;
import com.pruebajr.backend.service.ListaReproduccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.net.URI;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/lists")
public class ListaReproduccionController {

    @Autowired
    private ListaReproduccionService servicio;

    @PostMapping
    public ResponseEntity<?> crearLista(@RequestBody ListaReproduccion lista) {
        try {
            ListaReproduccion nueva = servicio.crearLista(lista);
            return ResponseEntity.created(URI.create("/lists/" + nueva.getNombre())).body(nueva);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> obtenerTodas() {
        return ResponseEntity.ok(servicio.obtenerTodas());
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerPorNombre(@PathVariable String nombre) {
        Optional<ListaReproduccion> lista = servicio.obtenerPorNombre(nombre);
        if (lista.isPresent()) {
            return ResponseEntity.ok(lista.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista no encontrada");
        }
    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<?> eliminar(@PathVariable String nombre) {
        try {
            servicio.eliminar(nombre);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista no encontrada");
        }
    }
}

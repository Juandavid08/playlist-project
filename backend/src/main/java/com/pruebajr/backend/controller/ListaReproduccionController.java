package com.pruebajr.backend.controller;

import com.pruebajr.backend.model.ListaReproduccion;
import com.pruebajr.backend.service.ListaReproduccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.net.URI;
@RestController
@RequestMapping("/lists")
public class ListaReproduccionController {

    @Autowired
    private ListaReproduccionService servicio;

    @PostMapping
    public ResponseEntity<?> crearLista(@RequestBody ListaReproduccion lista) {
        try {
            ListaReproduccion nueva = servicio.crearLista(lista);
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Lista creada exitosamente");
            response.put("lista", nueva);
            return ResponseEntity.created(URI.create("/lists/" + nueva.getNombre())).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Error en la solicitud: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping
    public ResponseEntity<?> obtenerTodas() {
        List<ListaReproduccion> listas = servicio.obtenerTodas();
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Listas obtenidas correctamente");
        response.put("listas", listas);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerPorNombre(@PathVariable String nombre) {
        Optional<ListaReproduccion> lista = servicio.obtenerPorNombre(nombre);
        if (lista.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Lista encontrada");
            response.put("lista", lista.get());
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Lista no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<?> eliminar(@PathVariable String nombre) {
        try {
            servicio.eliminar(nombre);
            // Por convención, no se envía cuerpo con 204 No Content
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Lista no encontrada");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
}

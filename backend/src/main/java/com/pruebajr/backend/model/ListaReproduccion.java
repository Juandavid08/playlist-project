package com.pruebajr.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class ListaReproduccion {

    @Id
    private String nombre;

    private String descripcion;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cancion> canciones;

    // Getters y setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Cancion> getCanciones() {
        return canciones;
    }

    public void setCanciones(List<Cancion> canciones) {
        this.canciones = canciones;
    }
}
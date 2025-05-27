import React, { useState } from 'react';
import {
  Modal, Box, Typography, TextField, Button, IconButton, List, ListItem, ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import { createPlaylist } from '../services/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};

const PlaylistModal = ({ open, onClose, onPlaylistCreated }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [canciones, setCanciones] = useState([]);

  // Estado para inputs de canción temporal
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [anno, setAnno] = useState('');
  const [genero, setGenero] = useState('');

  const agregarCancion = () => {
    if (!titulo.trim() || !artista.trim()) {
      alert('Titulo y Artista son obligatorios para la canción');
      return;
    }

    setCanciones([
      ...canciones,
      { titulo, artista, album, anno, genero }
    ]);

    // Limpiar inputs canción
    setTitulo('');
    setArtista('');
    setAlbum('');
    setAnno('');
    setGenero('');
  };

  const eliminarCancion = (index) => {
    setCanciones(canciones.filter((_, i) => i !== index));
  };

  const crearPlaylist = async () => {
    if (!nombre.trim()) {
      alert('El nombre de la playlist es obligatorio');
      return;
    }

    try {
      await createPlaylist({ nombre, descripcion, canciones });
      alert('Playlist creada con éxito');
      setNombre('');
      setDescripcion('');
      setCanciones([]);
      onPlaylistCreated();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al crear la playlist');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Crear Nueva Playlist</Typography>
        <TextField
          label="Nombre"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          fullWidth
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          margin="normal"
        />

        <Typography variant="subtitle1" mt={2}>Agregar Canciones</Typography>

        <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
          <TextField
            label="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            sx={{ flex: '1 1 40%' }}
          />
          <TextField
            label="Artista"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            required
            sx={{ flex: '1 1 40%' }}
          />
          <TextField
            label="Álbum"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            sx={{ flex: '1 1 40%' }}
          />
          <TextField
            label="Año"
            value={anno}
            onChange={(e) => setAnno(e.target.value)}
            sx={{ flex: '1 1 20%' }}
          />
          <TextField
            label="Género"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            sx={{ flex: '1 1 30%' }}
          />
          <IconButton color="primary" onClick={agregarCancion} sx={{ alignSelf: 'center' }}>
            <AddCircleOutline fontSize="large" />
          </IconButton>
        </Box>

        <List dense sx={{ maxHeight: 200, overflowY: 'auto', mt: 2 }}>
          {canciones.map((c, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${c.titulo} - ${c.artista}`}
                secondary={`${c.album || '-'} | ${c.anno || '-'} | ${c.genero || '-'}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => eliminarCancion(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {canciones.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              No hay canciones agregadas aún
            </Typography>
          )}
        </List>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={crearPlaylist}>
            Crear Playlist
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PlaylistModal;

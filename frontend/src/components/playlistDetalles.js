import React from 'react';
import {
  Modal, Box, Typography, List, ListItem, ListItemText, Button,
} from '@mui/material';
import { deletePlaylist } from '../services/api';

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

const PlaylistDetalles = ({ open, onClose, playlist, onDeleted }) => {
  if (!playlist) return null;

  const handleEliminar = async () => {
    if (window.confirm(`¿Eliminar playlist "${playlist.nombre}"?`)) {
      try {
        await deletePlaylist(playlist.nombre);
        alert('Playlist eliminada');
        onDeleted();
        onClose();
      } catch (error) {
        console.error(error);
        alert('Error al eliminar playlist');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" mb={2}>{playlist.nombre}</Typography>
        <Typography variant="subtitle1" mb={2}>{playlist.descripcion}</Typography>

        <Typography variant="h6">Canciones</Typography>
        <List dense sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {playlist.canciones.map((c, i) => (
            <ListItem key={i} divider>
              <ListItemText
                primary={`${c.titulo} - ${c.artista}`}
                secondary={`${c.album || '-'} | ${c.anno || '-'} | ${c.genero || '-'}`}
              />
            </ListItem>
          ))}
          {playlist.canciones.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" mt={1}>
              Esta playlist no tiene canciones
            </Typography>
          )}
        </List>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="contained" color="error" onClick={handleEliminar}>
            Eliminar Playlist
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PlaylistDetalles;

import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaylistModal from "../components/playlistModal";
import { getAllPlaylists, deletePlaylist } from "../services/api";

const PlaylistView = () => {
  const [playlists, setPlaylists] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPlaylists = async () => {
    try {
      const data = await getAllPlaylists();
      setPlaylists(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar playlists:", error);
      setPlaylists([]);
    }
  };

  const handleDelete = async (nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar la lista "${nombre}"?`)) {
      try {
        await deletePlaylist(nombre);
        fetchPlaylists();
      } catch (error) {
        console.error("Error al eliminar playlist:", error);
      }
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    fetchPlaylists();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Listas de Reproducción
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Crear nueva lista
      </Button>

      <Box mt={3}>
        {playlists.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No hay listas de reproducción aún.
          </Typography>
        ) : (
          playlists.map((playlist) => (
            <Accordion key={playlist.nombre} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Box>
                    <Typography variant="subtitle1">
                      <strong>{playlist.nombre}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {playlist.descripcion}
                    </Typography>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(playlist.nombre);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                {playlist.canciones && playlist.canciones.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>ID</strong></TableCell>
                          <TableCell><strong>Título</strong></TableCell>
                          <TableCell><strong>Artista</strong></TableCell>
                          <TableCell><strong>Álbum</strong></TableCell>
                          <TableCell><strong>Año</strong></TableCell>
                          <TableCell><strong>Género</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {playlist.canciones.map((cancion) => (
                          <TableRow key={cancion.id}>
                            <TableCell>{cancion.id}</TableCell>
                            <TableCell>{cancion.titulo}</TableCell>
                            <TableCell>{cancion.artista}</TableCell>
                            <TableCell>{cancion.album}</TableCell>
                            <TableCell>{cancion.anno}</TableCell>
                            <TableCell>{cancion.genero}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Esta lista no contiene canciones.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <PlaylistModal
        open={modalOpen}
        onClose={handleCloseModal}
        onCreated={fetchPlaylists}
      />
    </Box>
  );
};

export default PlaylistView;

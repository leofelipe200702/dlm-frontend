// src/components/CategoryFormModal.jsx

import React, { useState, useEffect } from 'react';
import CategoryService from '../services/category.service';
import { 
    Box,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    Button, 
    Alert
} from '@mui/material';

// O componente recebe propriedades (props) para saber se está aberto,
// qual categoria editar (se houver) e o que fazer após o salvamento.
const CategoryFormModal = ({ open, handleClose, categoryToEdit, onSaveSuccess }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Preenche o formulário quando categoryToEdit muda (modo Edição)
    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
        } else {
            setName(''); // Limpa para o modo Criação
        }
        setMessage('');
    }, [categoryToEdit, open]); // Depende da categoria passada e do estado de abertura

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        //const data = { name };
        const isEditing = !!categoryToEdit;

        try {
            if (isEditing) {
                // Modo Edição: Chama o UPDATE (PUT)
                await CategoryService.update(categoryToEdit.id, name);
                setMessage("Categoria atualizada com sucesso!");
            } else {
                // Modo Criação: Chama o CREATE (POST)
                await CategoryService.create(name);
                setMessage("Categoria criada com sucesso!");
            }
            
            // Sucesso: Limpa o nome e notifica o componente pai (CategoryList)
            setName('');
            setTimeout(() => {
                onSaveSuccess(); // Recarrega a lista
                handleClose(); // Fecha o modal
            }, 1000);

        } catch (error) {
            const errorMsg = 
                (error.response?.data?.message) || 
                "Erro ao salvar categoria. Verifique o nome.";
            setMessage(errorMsg);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const title = categoryToEdit ? "Editar Categoria" : "Adicionar Nova Categoria";

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {message && (
                        <Alert severity={message.includes("sucesso") ? "success" : "error"} sx={{ mb: 2 }}>
                            {message}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da Categoria"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" disabled={loading}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default CategoryFormModal;
// src/components/CategoryList.jsx
import React, { useState, useEffect } from 'react';
import CategoryService from '../services/category.service';
import AuthService from '../services/auth.service';
import CategoryFormModal from './CategoryFormModal.jsx';
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    IconButton,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [canManage, setCanManage] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Função que carrega os dados da API
    const retrieveCategories = () => {
        CategoryService.getAll()
            .then(response => {
                setCategories(response.data);
                console.log("Categorias carregadas:", response.data);
            })
            .catch(error => {
                const errorMsg = 
                    (error.response?.data?.message) || 
                    "Não foi possível carregar as categorias.";
                setMessage(errorMsg);
                console.error("Erro ao carregar categorias:", error);
            });
    };

    // 1. useEffect para carregar o usuário logado e as permissões
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            const roles = user.roles;
            
            // Verifica se o usuário tem permissão de gerenciamento (LIBRARIAN ou ADMIN)
            const isLibrarianOrAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ROLE_LIBRARIAN");
            setCanManage(isLibrarianOrAdmin);
            
            // Verifica se o usuário é ADMIN (para a permissão mais alta, como Deletar)
            setIsAdmin(roles.includes("ROLE_ADMIN"));
        }
        
        // 2. Chama a função de carregamento da API
        retrieveCategories();
    }, []); // O array vazio [] garante que isso só rode no primeiro render

    // Função de Exclusão
    const handleDelete = (id) => {
        if (!window.confirm("Tem certeza que deseja deletar esta categoria?")) return;

        CategoryService.delete(id)
            .then(() => {
                setMessage("Categoria deletada com sucesso!");
                // Atualiza a lista removendo o item deletado
                setCategories(categories.filter(cat => cat.id !== id));
            })
            .catch(error => {
                setMessage("Erro ao deletar: Permissão negada ou item inexistente.");
                console.error("Erro ao deletar:", error);
            });
    };

    // Lógica para Abrir Modal (Criação)
    const handleCreate = () => {
        setEditingCategory(null); // Garante que está em modo de Criação
        setOpenModal(true);
    };

    // Lógica para Abrir Modal (Edição)
    const handleEdit = (category) => {
        setEditingCategory(category); // Passa o objeto para preencher o formulário
        setOpenModal(true);
    };

    // Lógica para Fechar Modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingCategory(null); // Limpa o estado
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Gerenciamento de Categorias
            </Typography>

            {/* Botão de Adicionar (Visível apenas para LIBRARIAN e ADMIN) */}
            {canManage && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mb: 3 }}
                    // Lógica para abrir modal de criação (próxima etapa)
                    onClick={handleCreate}
                >
                    Adicionar Nova Categoria
                </Button>
            )}

            {message && (
                <Alert severity={message.includes("sucesso") ? "success" : "error"} sx={{ mb: 3 }}>
                    {message}
                </Alert>
            )}

            {/* Tabela de Dados (MUI Table) */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.200' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome da Categoria</TableCell>
                            {canManage && <TableCell align="right">Ações</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id} hover>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                
                                {/* Célula de Ações (Visível apenas para quem pode gerenciar) */}
                                {canManage && (
                                    <TableCell align="right">
                                        
                                        {/* Botão Editar: Visível para LIBRARIAN e ADMIN */}
                                        <IconButton color="primary" onClick={() => handleEdit(category)}>
                                            <EditIcon />
                                        </IconButton>
                                        
                                        {/* Botão Deletar: Visível APENAS para ADMIN */}
                                        {isAdmin && (
                                            <IconButton color="error" onClick={() => handleDelete(category.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CategoryFormModal 
                open={openModal} 
                handleClose={handleCloseModal}
                categoryToEdit={editingCategory}
                onSaveSuccess={retrieveCategories} // Chama a função para recarregar a lista
            />
        </Box>
    );
};

export default CategoryList;
import { use, useEffect, useState } from "react";
import Api from "../../API/api";
import { Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import DadosTable from "../Table/table";
import ModalConvidadoNovo from "../Modais/Convidado/modalConvidadoNovo";
import ConvidadoModalNovo from "../Modais/Convidado/modalConvidadoNovo";
import ConvidadoModalEditar from "../Modais/Convidado/modalConvidadoEditar";



function ConvidadosAcompanhantes() {
    const [convidados, setConvidados] = useState([]);
    const [showModalNovo, setShowModalNovo] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalDeletar, setShowModalDeletar] = useState(false);
    const [dadosForm, setDadosForm] = useState(null);
    const [editando, setEditando] = useState(false)

    const buscarConvidados = async () => {
        try {
            const res = await Api.get("/convidado");

            setConvidados(res.data.dados);
            console.log(res.data.dados);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        buscarConvidados();
    }, []);


    const handleEdit = (row) => {
        console.log("Editando", row);
        setDadosForm(row)
        setShowModalEditar(true)
    };

    const handleDelete = (id) => {
        console.log("Excluindo", id);
        setShowModalDeletar(true)
    };



    const columns = [
        { header: "Nome", accessor: "nome" },
        { header: "Sobrenome", accessor: "sobrenome" },
        { header: "Email", accessor: "email" },
        { header: "Cpf", accessor: "cpf" },
        { header: "Telefone", accessor: "telefone" },
        { header: "Categoria", accessor: "categoria" },
        { header: "Confirmação", accessor: "confirmacao" },

        {
            header: "Acoes",
            accessor: "acoes",
            render: (row) => (
                <div className="d-flex gap-2">
                    <Button
                        className="ignorar-fonte-btn"
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(row)}
                    >
                        <CiEdit />
                    </Button>
                    <Button
                        className="ignorar-fonte-btn"
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(row.id_usuario)}
                    >
                        <MdDelete />
                    </Button>
                </div>
            ),
        },
    ];

    const enviarDadosNovo = async (dados) => {
        try {

            const res = await Api.post('/convidado', dados)
            if (res.status === 201) {
                console.log('Convidado criado')
                await buscarConvidados()
                setShowModalNovo(false)
            }
        } catch (err) {
            console.log('Erro ao enviar dados', err)
        }
    }

    const enviarDadosEditar = async (dados, editando) => {
        try {
            if (editando) {
                const res = await Api.put(`/convidado?email_convidado=${dadosForm.email}`, dados)

                if (res.status === 200) {
                    console.log('Convidado editado')
                    await buscarConvidados()
                    setShowModalEditar(false)
                }
            }

        } catch (err) {
            console.log('Erro ao enviar dados', err)
        }
    }

    return (
        <>
            <h1>Convidados</h1>

            <Button onClick={() => setShowModalNovo(true)} className="my-3 ignorar-fonte-btn" variant="primary">
                <IoMdAddCircleOutline /> Criar novo
            </Button>
            <DadosTable columns={columns} rows={convidados} keyField={"id_convidado"} />
            <ConvidadoModalNovo data={dadosForm} handleClose={() => setShowModalNovo(false)} show={showModalNovo} onSubmit={enviarDadosNovo} />
            <ConvidadoModalEditar data={dadosForm} handleClose={() => setShowModalEditar(false)} show={showModalEditar} onSubmit={enviarDadosEditar} />

        </>
    );
}

export default ConvidadosAcompanhantes;
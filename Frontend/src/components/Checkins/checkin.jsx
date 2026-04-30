import { use, useEffect, useState } from "react";
import Api from "../../API/api";
import { Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import DadosTable from "../Table/table";
import CheckinModalNovo from "../Modais/Checkin/modalCheckinNovo";
import CheckinModalEditar from "../Modais/Checkin/modalCheckinEditar";
import CheckinModalDeletar from "../Modais/Checkin/modalCheckinDeletar";
import { toast } from "react-toastify";



function Checkin() {
    const [checkins, setCheckins] = useState([]);
    const [showModalNovo, setShowModalNovo] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false)
    const [showModalDeletar, setShowModalDeletar] = useState(false);
    const [dadosForm, setDadosForm] = useState(null);
    const [editando, setEditando] = useState(false)
    const [idCheckin, setIdCheckin] = useState(null)

    const buscarCheckins = async () => {
        try {
            const res = await Api.get("/checkin");

            setCheckins(res.data.dados);
            console.log(res.data.dados);
        } catch (err) {
            toast.error('Erro ao buscar checkins', {
                position: "top-right",
                autoClose: 3000,
            });
            console.log(err);
        }
    };

    useEffect(() => {
        buscarCheckins();
    }, []);


    const handleEdit = (row) => {
        console.log("Editando", row);
        setDadosForm(row)
        setShowModalEditar(true)
    };

    const handleDelete = (id) => {
        console.log("Excluindo", id);
        setIdCheckin(id)
        setShowModalDeletar(true)
    };



    const columns = [
        { header: "Checkin Id", accessor: "id_checkin" },
        { header: "Usuario Id", accessor: "usuario_idusuario" },
        { header: "Convidado Id", accessor: "convidado_idconvidado" },
        { header: "Data e hora", accessor: "data_e_hora" },
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
                        onClick={() => handleDelete(row.id_checkin)}
                    >
                        <MdDelete />
                    </Button>
                </div>
            ),
        },
    ];

    const enviarDadosNovo = async (dados) => {
        try {

            const res = await Api.post('/checkin', dados)
            if (res.status === 201) {
                toast.success('Checkin criado', {
                    position: "top-right",
                    autoClose: 3000,
                });
                await buscarCheckins()
                setShowModalNovo(false)
            }

        } catch (err) {
            toast.error(err.response.data || 'Erro ao criar checkin', {
                position: "top-right",
                autoClose: 3000,
            });
            console.log('Erro ao enviar dados', err)
        }
    }

    const enviarDadosEditar = async (dados, editando) => {
        try {
            if (editando) {
                const res = await Api.put(`/checkin?id_checkin=${dadosForm.id_checkin}`, dados)

                if (res.status === 200) {
                    toast.success('Checkin editado', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    await buscarCheckins()
                    setShowModalEditar(false)

                }

            }
        } catch (err) {
            toast.error(err.response.data || 'Erro ao editar checkin', {
                position: "top-right",
                autoClose: 3000,
            });
            console.log('Erro ao enviar dados', err)
        }
    }

    const deletarCheckin = async () => {
        try{
            const res = await Api.delete(`/checkin?id_checkin=${idCheckin}`)

            if(res.status === 200){
                toast.success('Checkin deletado', {
                    position: "top-right",
                    autoClose: 3000,
                });
                await buscarCheckins()
                setShowModalDeletar(false)
            }
        }catch(err){
            toast.error(err.response.data || 'Erro ao deletar checkin', {
                position: "top-right",
                autoClose: 3000,
            });  
            console.log(err)
        }
    }

    return (
        <>
            <h1>Checkins</h1>
            <Button onClick={() => setShowModalNovo(true)} className="my-3 ignorar-fonte-btn" variant="primary">
                <IoMdAddCircleOutline /> Criar novo
            </Button>
            <DadosTable columns={columns} rows={checkins} keyField={"id_checkin"} />
            <CheckinModalNovo data={dadosForm} handleClose={() => setShowModalNovo(false)} show={showModalNovo} onSubmit={enviarDadosNovo} />
            <CheckinModalEditar data={dadosForm} handleClose={() => setShowModalEditar(false)} show={showModalEditar} onSubmit={enviarDadosEditar} />
            <CheckinModalDeletar deletar={deletarCheckin} handleClose={() => setShowModalDeletar(false)} show={showModalDeletar}/>
        </>
    );
}

export default Checkin;
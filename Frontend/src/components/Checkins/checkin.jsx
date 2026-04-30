import { use, useEffect, useState } from "react";
import Api from "../../API/api";
import { Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import DadosTable from "../Table/table";



function Checkin() {
    const [checkins, setCheckins] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalDeletar, setShowModalDeletar] = useState(false);
    const [dadosForm, setDadosForm] = useState(null);
    const [editando, setEditando] = useState(false)

    const buscarCheckins = async () => {
        try {
            const res = await Api.get("/checkin");

            setCheckins(res.data.dados);
            console.log(res.data.dados);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        buscarCheckins();
    }, []);


    const handleEdit = (row) => {
        console.log("Editando", row);
        setDadosForm(row)
        setShowModal(true)
    };

    const handleDelete = (id) => {
        console.log("Excluindo", id);
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
                        onClick={() => handleDelete(row.id_usuario)}
                    >
                        <MdDelete />
                    </Button>
                </div>
            ),
        },
    ];

    const enviarDados = async (dados, editando) => {
        try {
            if (editando) {
                const res = await Api.put(`/checkin?id_checkin=${dadosForm.id_checkin}`, dados)

                if (res.status === 200) {
                    console.log('Checkin editado')
                    await buscarCheckins()
                
                }
            } else {
                const res = await Api.post('/checkin', dados)
                if (res.status === 201) {
                    console.log('Checkin criado')
                    await buscarCheckins()
                }
            }
        } catch (err) {
            console.log('Erro ao enviar dados', err)
        }
    }

    return (
        <>
            <h1>Checkins</h1>
            <Button onClick={() => setShowModal(true)} className="my-3 ignorar-fonte-btn" variant="primary">
                <IoMdAddCircleOutline /> Criar novo
            </Button>
            <DadosTable columns={columns} rows={checkins} keyField={"id_checkin"} />
         
        </>
    );
}

export default Checkin;
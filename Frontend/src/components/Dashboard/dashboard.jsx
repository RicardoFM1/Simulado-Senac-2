import { useEffect, useState } from "react"
import Api from "../../api/api"


function Dashboard () {

    const [usuarios, setUsuarios] = useState([])

    const buscarUsuarios = async () => {
        try{
            const res = await Api.get('/usuario')

            if(res.status === 200){
                setUsuarios(res.data.dados)
                console.log(res.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        buscarUsuarios()
    }, [])

    return (
        <>
        
        </>

    )
}


export default Dashboard
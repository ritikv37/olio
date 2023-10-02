import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';





export default function List() {
    const [data, setData] = useState([])
    const rows = data.map((e, ind) => {
        return { ...e, id: ind + 1 }
    })
    console.log(rows)

    useEffect(() => {
        axios.get(`http://localhost:8000/get-data`)
            .then((res) => {
                console.log(res.data.data)
                setData(res.data.data)
            })
            .catch((err => {
                console.log(err)
            }))
    }, [])


    const handleDownload = (id) => {
        console.log(`Downloading file for ID: ${id}`);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'gender', headerName: 'Gender', width: 130 },
        {
            field: 'date',
            headerName: 'DOB',

            width: 150,
        },
        {
            field: 'hobby',
            headerName: 'Hobby',
            width: 180,
        },
        {
            field: 'download',
            headerName: 'Download',
            width: 150,
            renderCell: (params) => (
                <a download={`http://localhost:8000/uploads/${params.row.resume}`}  href={`http://localhost:8000/uploads/${params.row.resume}`}  target='_blank'>
                    <button className='px-5 py-2 bg-blue-500 text-white rounded' >Download</button>
                </a>
            ),
        },

    ];

    return (
        <div className='mt-20 flex justify-center items-center'>
            <div className=' w-[60%]'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </div>
    );
}
import React, { useEffect, useState } from 'react'
import apartmentService from '../service/apartment.ts';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext.tsx';

export default function Apartment() {
    const [data, setData]: any = useState([]);
    const navigate = useNavigate();
    const { logout } = useUserContext();
    const fetchData = async () => {
        try {
            const result: any = await apartmentService.getAll();
            console.log(result)
            if (result.success) {
                setData(result.data.recordset);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <button className='btn btn-primary' onClick={() => logout()}>Logout</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>PhoneNumber</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(data || []).map((d: any) => (
                        <tr>
                            <td>{d.DepartmentID}</td>
                            <td>{d.Name}</td>
                            <td>{d.Location}</td>
                            <td>{d.PhoneNumber}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => navigate(`/apartment/edit/${d.DepartmentID}`)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

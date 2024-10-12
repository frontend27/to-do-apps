

const ListUser = ({user, onDelete, editForm, active})=>{

    console.log(active,'dfdfd')
  
    return (
        <div className="container">
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((data)=>(
                            <tr key={data.id} onClick={()=> editForm(data.id)} style={{textDecoration: active === data.id ? 'line-through' : ''}}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.address}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=> onDelete(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListUser;
import {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export const Users = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (!editing) {
            
            const res = await fetch(`${API}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data);
        }else{
            const res = await fetch(`${API}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId('');
        }

        await getUsers();

        // Clean inputs of the form
        setName('');
        setEmail('');
        setPassword('');
    }

    const getUsers = async () => {

        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    const editUser = async (id) => {
        
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();
        
        setEditing(true);
        setId(id);

        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
    }

    const deleteUser = async (id) => {
        
        const userResponse = window.confirm('Are you sure you want to delete this user?')

        if (userResponse) {
            
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            });
    
            const data = await res.json();
            console.log(data);
            await getUsers();
        }
    }

    useEffect( () => {
        
        getUsers();
    }, []);

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className='border-end px-3'>
                    <div className='mb-3 input-group-sm'>
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name} 
                            className="form-control"
                            placeholder='Name'
                            autoFocus
                        />
                    </div>
                    <div className='mb-3 input-group-sm'>
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            className="form-control"
                            placeholder='Email'/>
                    </div>
                    <div className='mb-3 input-group-sm'>
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            className="form-control"
                            placeholder='Password'/>
                    </div>
                    <button className='btn btn-primary fw-bold'>
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                <div className='table-responsive'>    
                    <table className='table table-sm table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>(
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='btn btn-secondary btn-sm mx-1 fw-bold'
                                                onClick={(e) => editUser(user._id)}>
                                            Edit
                                        </button>
                                        <button className='btn btn-danger btn-sm fw-bold'
                                                onClick={(e) => deleteUser(user._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
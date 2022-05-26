import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { About } from './components/About';
import { Users } from './components/Users';
import { Navbar } from './components/Navbar';

function App() {
	return (
		<Router>
			<Navbar />
			<div className='container mt-5'>
				<Routes>
					<Route path='/' element={<Users />}/>
					<Route path='/about' element={<About />}/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;

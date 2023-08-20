import './index.css'
import Home from './Register/Home'
import Loginuser from './Register/Loginuser'
import Resetpass from './Register/Resetpass'
import Dasboarduser from './Pages/Dasboarduser'
import Resetpassconfirm from './Register/Resetpassconfirm'
import Registeruser from './Register/Registeruser'
import Activate from './Register/Activate'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
function App() {

  return (
    <Provider store={store}>
      <Router>
      <Routes>
        <Route path='/' element={<Loginuser />}/>
        <Route path='/loginuser' element={<Loginuser/>}/>
        <Route path='/register' element = {<Registeruser/>}/>
        <Route path='/reset_password' element={<Resetpass/>}/>   
        <Route path='/password/reset/confirm/:uid/:token' element={<Resetpassconfirm/>}/>
        <Route path='/activate/:uid/:token' element={<Activate/>}/>
        <Route path='/dashboard' element={<Dasboarduser/>}/>
      </Routes>
    </Router>
    </Provider>
  )
}

export default App

import './App.css'
import Home from './pages/Home'
import { ShowMenuProvider } from "./context/ShowMenuProvider"


function App() {

  return (
    <>
     <ShowMenuProvider >
    <Home />
    </ShowMenuProvider>
    </>
  )
}

export default App

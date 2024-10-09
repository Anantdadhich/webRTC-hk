import { BrowserRouter,Route, Routes } from "react-router-dom"
import {Sender} from "./routes/Sender"
import { Receiver } from "./routes/Reciever"


function App() {
   return (
    <BrowserRouter>
    <Routes>
      <Route path="/sender" element={<Sender/>}></Route>
      <Route path="/reciever" element={<Receiver/>}></Route>
    </Routes>
    
    </BrowserRouter>
   )
  
}

export default App

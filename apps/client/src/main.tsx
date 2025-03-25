import ReactDOM from 'react-dom/client'
import MainRoutes from './routes'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')as HTMLElement).render(
    <BrowserRouter>
        <MainRoutes />
    </BrowserRouter>
)

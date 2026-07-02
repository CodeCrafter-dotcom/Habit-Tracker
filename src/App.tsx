import CardPages from './Pages/CardPages/CardPages'
import { ContextProvider } from './Context/Context'
import CardsPages from './Pages/CardsPages'
import Router from './Router'

import './styles'

type RoutesConfig = Record<string, React.ComponentType<any>>

const ROUTES: RoutesConfig = {
  '/': CardsPages,
  '/card/:id': CardPages,
  '*': () => <div>404 not found</div>,
}

function App() {
  return (
    <ContextProvider>
      <Router routes={ROUTES}/>
    </ContextProvider>
  )
}

export default App

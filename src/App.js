import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import HomePage from "./pages/login.js"
import Dashboard from "./pages/dashboard"
import Leaderboard from "./pages/leaderboard"
import SignUp from "./pages/signup"
import { StoreProvider } from "./store/index.tsx"

function App() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </StoreProvider>
  )
}

export default App

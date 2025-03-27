import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DashboardLayout from "./pages/DashboardLayout"
import FriendsList from "./pages/FriendsList"
import FriendRequests from "./pages/FriendRequests"
import ConversationList from "./pages/ConversationList"
import NotFound from "./pages/NotFound"
import Base from "./pages/Base"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Base />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="friends" element={<FriendsList />} />
            <Route path="friend-requests" element={<FriendRequests />} />
            <Route index path="conversations" element={ <ConversationList />} />
            <Route index path="conversations/:cid" element={ <h1>Specific Conversation route</h1> } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

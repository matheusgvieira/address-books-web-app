import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddNewAddress from "./pages/AddNewAddress";
import { EditUser } from "./pages/EditUser";
import { UserList } from "./pages/UserList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/add" />} />
          <Route path="/add" element={<AddNewAddress />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/edit/:username" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

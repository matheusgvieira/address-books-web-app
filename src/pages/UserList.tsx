import { useNavigate } from "react-router-dom";
import { useAddressStore } from "../store/addressStore";

export const UserList = () => {
  const { users, removeUser, clearUsers } = useAddressStore();
  const navigate = useNavigate();

  if (users.length === 0)
    return <p className="text-gray-500">Nenhum usuário adicionado.</p>;

  return (
    <div className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 hover:text-blue-500 cursor-pointer"
          onClick={() => navigate("/add")}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h3 className="text-lg font-bold">Usuários cadastrados</h3>
        <button
          onClick={clearUsers}
          className="primary text-sm text-red-600 hover:underline px-2 py-1 rounded"
        >
          Limpar todos
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li
            key={user.username}
            className="py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user.displayName}</p>
              <p className="text-sm text-gray-600">
                {user.postalCode} - {user.logradouro}, {user.bairro} -{" "}
                {user.localidade}/{user.uf}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 hover:text-blue-500 cursor-pointer"
                onClick={() => navigate(`/edit/${user.username}`)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 hover:text-blue-500 cursor-pointer"
                onClick={() => removeUser(user.username)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

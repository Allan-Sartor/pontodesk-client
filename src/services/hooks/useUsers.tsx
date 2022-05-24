import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type Meta = {
  current_page: number;
	totalItems: number;
	itemsPerPage: number;
}

type getUsersResponse = {
  pagination: Meta[];
  users: User[];
}

export async function getUsers(): Promise<getUsersResponse> {
    const { data, headers } = await api.get("/users");

    // const totalCount = Number(headers['x-total-count'])
    const pagination = data.pagination
    const users = data.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }
    });

    return {
      users,
      pagination
    };
}

export function useUsers(currentPage: number, options: UseQueryOptions) {
  return useQuery(['users', currentPage, 'pagination'], () => getUsers(), {
      staleTime: 1000 * 60 * 10 , // 10 minutos
      ...options,
    }); // qual chave que vai ser armazenado no cache
}
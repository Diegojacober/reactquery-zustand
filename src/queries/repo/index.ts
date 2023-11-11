import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import api from "../../services/api";
import { Repo } from "./types";

async function getRepos(ctx: QueryFunctionContext) {
  const [, userId] = ctx.queryKey;
  const { data } = await api.get<Repo[]>(`/users/${userId}/repos`);

  return data;
}

//adicionando camada de cache
export default function useFetchRepos(userId: string) {
  return useQuery({ queryKey: ["repos", userId], queryFn: getRepos });
}

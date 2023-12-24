import { DOMAIN } from "@env";
import useQuery from "./useQuery";
import { User } from "../types/database";

export default function useFetchUser(userId: string) {
  const query = useQuery<User | null>(
    `${DOMAIN}/api/users/getUser/${userId}`,
    null
  );

  return query;
}

import { useState,useEffect } from "react";

// Model //

import type { ItemsType } from "@/models/User";

// API //

import { useBackend } from '@/hooks/useLaravelBackend';
import { userService } from "@/api/services/backend/user/user.service";

export default function getUsers(enabled:boolean) {
    const [users, setUsers] = useState<ItemsType | null>(null);
    const { loading:loadingUsers, error:errorUsers, mutate:mutateUsers } = useBackend<ItemsType>("get", userService.paths.getAll);

    useEffect(() => {
        if(enabled)
        {
            mutateUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch(() => {});
        }
    }, []);

    return { users,loadingUsers,errorUsers };
}

import { UserRound, BookUser } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/button";

import { mapRoleName } from "./utils/mapRoleName";
import { User, ActivitiesProps } from "./types";

export function Activities({ users, onUserClick }: ActivitiesProps) {



  const groupedUsers = useMemo(() => {
    return users.reduce<Record<string, User[]>>((groups, user) => {
      const role = user.role || "VISITOR";
      groups[role] = [...(groups[role] || []), user];
      return groups;
    }, {});
  }, [users]);


  const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <div className="space-y-2.5 mb-2">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        <UserRound className="size-5 text-zinc-500 shrink-0" />
        <span className="text-zinc-100">{user.name}</span>
        <span className="text-zinc-400 text-sm ml-auto">
          <Button 
            variant="secondary" 
            onClick={() => onUserClick(user.id)}
          >
            <BookUser className="size-5 text-zinc-500 shrink-0" />
          </Button>
        </span>
      </div>
    </div>
  );


  const UserGroupSection: React.FC<{ role: string; users: User[] }> = ({ 
    role, 
    users 
  }) => (
    <div key={role} className="space-y-2.5">
      <div className="flex gap-2 items-baseline">
        <span className="text-xl text-zinc-300 font-semibold">
          {mapRoleName(role)}
        </span>
        <span className="text-xs text-zinc-500">{users.length}</span>
      </div>
      <div>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {Object.keys(groupedUsers).length > 0 ? (
        Object.entries(groupedUsers).map(([role, roleUsers]) => (
          <UserGroupSection 
            key={role} 
            role={role} 
            users={roleUsers} 
          />
        ))
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum usuário disponível.</p>
      )}
    </div>
  );
};
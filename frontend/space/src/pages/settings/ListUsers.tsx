import { UserRound, BookUser } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../../components/button";



interface ActivitiesProps {
  users: User[];
  onUserClick: (userId: number | string) => void; 
}
interface User {
  id: number | string;
  name: string;
  email: string;
  password: string;
  role: string;
}
export function Activities({ users, onUserClick  }: ActivitiesProps) {

  const [usersList, setUsersList] = useState<User[]>(users);

  useEffect(() => {
    
    setUsersList(users);
  }, [users]);


  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Administradores </span>
          <span className="text-xs text-zinc-500">{usersList.length}</span>
        </div>
        <div>
          {usersList.map((user) => (

            <div key={user.id} className="space-y-2.5 mb-2">
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                <UserRound className="size-5 text-zinc-500  shrink-0" />
                <span className="text-zinc-100">{user.name}</span>
                <span className="text-zinc-400 text-sm ml-auto">
                  <Button variant="secondary"
                    onClick={() => onUserClick(user.id)}>
                    <BookUser className="size-5 text-zinc-500  shrink-0" /> 
                  </Button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
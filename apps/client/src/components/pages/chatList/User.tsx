import { Dispatch, SetStateAction } from "react";
import { IUser } from "../../../interfaces/global";

interface IProps {
  connected: boolean;
  isSelected?: boolean;
  setSelectedUser?: Dispatch<SetStateAction<IUser>>;
  user: IUser;
}

export function User({ connected, isSelected, setSelectedUser, user }: IProps) {
  return (
    <div
      className={`list-group-item${isSelected ? ' active' : ''} d-flex justify-content-between align-items-center`}
      // onClick={() => setSelectedUser(user)}
    >
      <div className="fw-bold">
        {user.cpf}
      </div>
      {connected ? 'online' : 'offline'}
    </div>
  );
}

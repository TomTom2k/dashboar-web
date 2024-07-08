"use client"
import userApi from "@/api/user-api";
import { createContext, ReactNode, useState, useContext, FC, useEffect } from "react";

export interface User {
  _id: string;
  email: string;
  role: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePic: string;
}

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isLoading: boolean;
  error: string;
  handleDelete: (id: string) => void;
  userDetail: User | null;
  setUserDetail: React.Dispatch<React.SetStateAction<User | null>>;
  handlerAddUser: (data: User) => void;
  handlerUpdateUser: (data: User) => void;
  handlerSearchUser: (searchText: string, role: string) => User[]
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userDetail, setUserDetail] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsersData()
  }, [])

  const fetchUsersData = async () => {
    setIsLoading(true)
    try {
      const res = await userApi.get();
      setUsers(res)
    } catch (error) {
      console.error("Error when fetching data user: ", error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      if (!users) return;
      const res = await userApi.delete(id)
      if (res) {
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error when delete user: ", error);

    } finally {
      setIsLoading(false)
    }
  };

  const handlerAddUser = async (data: User) => {
    setIsLoading(true)
    try {
      const res = await userApi.create(data)
      if (res) {
        setUsers([data, ...users])
      }

    } catch (error) {
      console.error("Error when create user: ", error);
    } finally {
      setIsLoading(false)
    }
  }

  const handlerUpdateUser = async (data: User) => {
    setIsLoading(true);
    try {
      if (userDetail) {
        const updatedUser = await userApi.update(userDetail._id, data);
        if (updatedUser) {
          const updatedUsers = users.map(user =>
            user._id === updatedUser._id ? updatedUser : user
          );
          setUsers(updatedUsers);
        }
      }
    } catch (error) {
      console.error("Error when updating user: ", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handlerSearchUser = (searchText: string, role: string) => {
    let result: User[] = [...users]
    if (role) {
      result = result.filter(u => u.role === role)
    }

    if (searchText) {
      const searchTerm = searchText.toLowerCase().trim();
      result = result.filter(u =>
        u.firstName.toLowerCase().includes(searchTerm) ||
        u.lastName.toLowerCase().includes(searchTerm) ||
        u.email.toLowerCase().includes(searchTerm) ||
        u.phoneNumber.toLowerCase().includes(searchTerm)
      );
    }

    return result
  }

  const value = {
    users,
    setUsers,
    isLoading,
    error,
    handleDelete,
    userDetail,
    setUserDetail,
    handlerAddUser,
    handlerUpdateUser,
    handlerSearchUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };

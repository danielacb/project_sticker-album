import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/initSupabase";
import { Player, UserInfo } from "../types";

type ContextData = {
  user: UserInfo;
  players: Player[];
  collection: string[];
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<UserInfo>>;
  updateCollection: (playerId: string) => void;
};

const ContextDefaultValues = {
  user: undefined,
  players: [],
  collection: [],
  isLoading: true,
  setUser: () => null,
  updateCollection: () => null,
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<ContextData>(ContextDefaultValues);

export const StickersProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserInfo>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [collection, setCollection] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPlayers = async () => {
    try {
      const { data, error } = await supabase.from("players").select("*");

      if (error) {
        throw error;
      }

      setPlayers(data);
    } catch (error) {
      console.log("Error getting the players: ", error.message);
    }
  };

  const getCollection = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("stickers")
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      setCollection(data[0].stickers || []);
    } catch (error) {
      console.log("Error getting the collection: ", error.message);
    }
  };

  useEffect(() => {
    axios.post("/api/set-supabase-cookie", {
      event: user ? "SIGNED_IN" : "SIGNED_OUT",
      session: supabase.auth.session(),
    });

    user && getCollection();
  }, [user]);

  useEffect(() => {
    getPlayers();
    setIsLoading(false);
  }, []);

  const updateCollection = async (playerId: string) => {
    const { data } = await supabase
      .from("users")
      .update({ stickers: [...collection, playerId] })
      .eq("id", user.id);

    setCollection(data[0].stickers);
  };

  return (
    <Context.Provider
      value={{
        user,
        players,
        collection,
        isLoading,
        setUser,
        updateCollection,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStickers = () => useContext(Context);

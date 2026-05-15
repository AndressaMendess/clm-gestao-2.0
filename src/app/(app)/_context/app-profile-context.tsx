"use client";

import { createContext, useContext, useMemo, useState } from "react";

type AppProfile = {
  avatarSrc: string;
  email: string;
  name: string;
  phone: string;
};

type AppProfileContextValue = {
  profile: AppProfile;
  setProfile: (updater: Partial<AppProfile>) => void;
};

const defaultProfile: AppProfile = {
  avatarSrc: "",
  email: "andressa.clm@gmail.com",
  name: "Andressa Mendes",
  phone: "",
};

const AppProfileContext = createContext<AppProfileContextValue | null>(null);

type AppProfileProviderProps = {
  children: React.ReactNode;
};

export function AppProfileProvider({ children }: AppProfileProviderProps) {
  const [profile, setProfileState] = useState<AppProfile>(defaultProfile);

  const setProfile = (updater: Partial<AppProfile>) => {
    setProfileState((current) => ({ ...current, ...updater }));
  };

  const value = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile],
  );

  return <AppProfileContext.Provider value={value}>{children}</AppProfileContext.Provider>;
}

export function useAppProfile() {
  const context = useContext(AppProfileContext);

  if (!context) {
    throw new Error("useAppProfile must be used within AppProfileProvider");
  }

  return context;
}

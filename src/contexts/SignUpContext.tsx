import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SignUpFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

interface SignUpContextType {
  values: SignUpFormInputs;
  setValues: React.Dispatch<React.SetStateAction<SignUpFormInputs>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isErrorModalOpen: boolean;
  setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOtherErrorModalOpen: boolean;
  setIsOtherErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

interface SignUpFormProviderProps {
  children: ReactNode;
}

export const SignUpProvider = ({ children }: SignUpFormProviderProps) => {
  const [values, setValues] = useState<SignUpFormInputs>({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isOtherErrorModalOpen, setIsOtherErrorModalOpen] = useState(false);

  const contextValue: SignUpContextType = {
    values,
    setValues,
    loading,
    setLoading,
    error,
    setError,
    isModalOpen,
    setIsModalOpen,
    isErrorModalOpen,
    setIsErrorModalOpen,
    isOtherErrorModalOpen,
    setIsOtherErrorModalOpen,
  };

  return (
    <SignUpContext.Provider value={contextValue}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error(
      'useSignUpContext 는 SignUpProvider 안에서 사용되어야만 합니다.'
    );
  }
  return context;
};

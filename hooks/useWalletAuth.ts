import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useAccount, useSignMessage } from "wagmi";
import {
  useAuthenticateMutation,
  useChallengeLazyQuery,
} from "../graphql/generated/generated";
import { authState } from "../state/authState";
import { AuthData } from "../types";

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const [auth, setAuth] = useRecoilState(authState);
  const { signMessage } = useSignMessage({
    onSuccess(data) {
      authenticate({
        variables: {
          request: {
            address,
            signature: data,
          },
        },
      });
    },
  });
  const [getChallenge] = useChallengeLazyQuery({
    onCompleted: (data) => {
      signMessage({
        message: data.challenge.text,
      });
    },
    fetchPolicy: "network-only",
  });
  const [authenticate] = useAuthenticateMutation({
    onCompleted: (data) => {
      setAuth(data.authenticate);
    },
  });

  const login = () => {
    getChallenge({
      variables: {
        request: {
          address,
        },
      },
    });
  };

  const logout = () => {
    setAuth(undefined);
  };

  useEffect(() => {
    console.log({ data: auth });
  }, [auth]);

  return {
    login,
    logout,
    accessToken: auth?.accessToken,
    isConnected,
    isLoggedIn: !!auth,
  } as const;
};

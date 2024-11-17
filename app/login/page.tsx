"use client";
import { submitLogin } from "@/api/clientActions/login";
import AppButton from "@/components/AppButton";
import AppPlainInput from "@/components/AppPlainInput";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: () => submitLogin({ username, password }),
    onMutate() {
      setIsLoading(true);
    },
    onSuccess(data) {
      if (data.error !== null) {
        setError(data.error);
      } else {
        setCookie("swl_token", data.data?.access_token);
        router.push("/");
      }
    },
    onError() {
      setError("Something went wrong :(");
    },
    onSettled() {
      setIsLoading(false);
    },
  });
  async function login() {
    setUsernameError(null);
    setPasswordError(null);
    if (!username || username.trim().length < 2) {
      setUsernameError("Username min length should be 2");
      return;
    }
    if (!password || password.trim().length < 8) {
      setPasswordError("Password min length should be 8");
      return;
    }
    loginMutation.mutate();
  }

  return (
    <div className="w-full h-fit flex flex-col justify-start gap-y-6 items-center">
      <h1 className="text-xl font-semibold">Login</h1>
      <div className="max-w-[560px] w-full flex flex-col justify-start gap-y-6 ">
        <AppPlainInput
          label="Username"
          placeholder="Username"
          onChange={(val) => setUsername(val)}
          error={usernameError}
        />
        <AppPlainInput
          label="Password"
          placeholder="Password"
          type="password"
          onChange={(val) => setPassword(val)}
          error={passwordError}
        />

        {error && (
          <div className="bg-red-50 text-white p-4 border border-solid border-red-500  w-full ">
            <p className="font-medium text-red-500">✕ {error}</p>
          </div>
        )}

        <AppButton
          onClick={() => {
            login();
          }}
          text="Submit"
        />
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import login, { ActionState } from "@/actions/login";
import { Input } from "@/components/ui/input";

import { useFormStatus } from "react-dom";
// import ErrorMessage from '../helper/error-message';
import Link from "next/link";
import React from "react";
import styles from "./login-form.module.css";

const initialState: ActionState = {
  ok: false,
  error: "",
  data: null,
};

function FormButton({ isPending }: { isPending: boolean }) {
  return (
    <>
      {isPending ? (
        <Button disabled={isPending} className="w-full cursor-pointer">
          Entrando...
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={() => console.log("Clicouu" + isPending)}
          className="w-full cursor-pointer"
        >
          Entrar
        </Button>
      )}
    </>
  );
}

export default function LoginForm() {
  const [state, action, isPending] = React.useActionState<
    ActionState,
    FormData
  >(login, initialState);

  React.useEffect(() => {
    if (state.ok) window.location.href = "/dashboard";
  }, [state.ok]);

  return (
    <form action={action} className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Jhon"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <FormButton isPending={isPending} />
          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

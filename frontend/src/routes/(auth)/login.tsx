import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import AuthFormWrapper from "@/components/AuthFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { loginSchema, type TLoginForm } from "@/lib/schemas";
import { PasswordInput } from "@/components/PasswordInput";
import AuthLink from "@/components/AuthLink";
import AuthFormHeader from "@/components/AuthFormHeader";
import AuthInnerForm from "@/components/AuthInnerForm";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useLoginMutation } from "@/services/authApi";
import { extractErrorMessage } from "@/lib/helpers";

import { store } from "@/app/store";

const Login = () => {
  // most of this code is duplicated in create-account route
  // but wrapping it in a custom hook requires a lot of typescript hacks to make it work
  // so I decided to keep it as is

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, errors } = form.formState;

  const onSubmit = async (data: TLoginForm) => {
    try {
      const res = await login(data).unwrap();

      dispatch({ type: "auth/setToken", payload: res });
      navigate({ to: "/welcome" });
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      form.setError("root.serverError", { message: errorMessage });
      console.error("Auth error:", error);
    }
  };

  return (
    <AuthFormWrapper>
      <AuthFormHeader
        title="Login"
        subtitle="Continue to Expert Social Media Management"
      />

      <Form {...form}>
        <AuthInnerForm
          onSubmit={form.handleSubmit(onSubmit)}
          btnText="LOGIN"
          btnDisabled={!isValid || isLoading}
          serverError={errors.root?.serverError.message}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    type="text"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AuthInnerForm>
      </Form>

      <div>
        Don't have an account yet?{" "}
        <AuthLink to={"/create-account"}>Register</AuthLink>
      </div>
    </AuthFormWrapper>
  );
};

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
  beforeLoad: async () => {
    // we should check if token is valid (?) to prevent useless redirect to /welcome
    const token = store.getState().auth.token;
    if (token) {
      throw redirect({
        to: "/welcome",
      });
    }
  },
});

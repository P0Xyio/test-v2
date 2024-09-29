import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

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
import { registerSchema, type TRegisterForm } from "@/lib/schemas";
import { PasswordInput } from "@/components/PasswordInput";
import AuthLink from "@/components/AuthLink";
import AuthFormWrapper from "@/components/AuthFormWrapper";
import AuthFormHeader from "@/components/AuthFormHeader";
import AuthInnerForm from "@/components/AuthInnerForm";
import { useRegisterMutation } from "@/services/authApi";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { extractErrorMessage } from "@/lib/helpers";

const CreateAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<TRegisterForm>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isValid, errors } = form.formState;

  const onSubmit = async (values: TRegisterForm) => {
    try {
      const res = await register(values).unwrap();

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
        title="Register Account"
        subtitle="One last step before starting your journey."
      />

      <Form {...form}>
        <AuthInnerForm
          onSubmit={form.handleSubmit(onSubmit)}
          btnText="REGISTER"
          btnDisabled={!isValid || isLoading}
          serverError={errors.root?.serverError.message}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    type="text"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    type="email"
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
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm Password"
                    autoComplete="new-password"
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
        Already have an account? <AuthLink to={"/login"}>Log In.</AuthLink>
      </div>
    </AuthFormWrapper>
  );
};

export const Route = createLazyFileRoute("/(auth)/create-account")({
  component: CreateAccount,
});

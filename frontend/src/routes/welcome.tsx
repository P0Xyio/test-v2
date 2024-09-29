import { store } from "@/app/store";
import GradientText from "@/components/GradientText";
import Icon from "@/components/Icon";
import UserAvatar from "@/components/UserAvatar";
import { authApi } from "@/services/authApi";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { memo } from "react";

interface UserDetailsRowProps {
  label: string;
  value: string;
}

const UserDetailsRow = memo(({ label, value }: UserDetailsRowProps) => {
  return (
    <p>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
});

const Loading = () => {
  return (
    <div className="mt-4 flex w-full flex-col items-center sm:mt-16">
      <Icon name={"loader"} className="h-6 w-6 animate-spin"></Icon>Loading...
    </div>
  );
};

const Welcome = () => {
  const user = Route.useLoaderData();

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="mt-4 flex w-full flex-col items-center sm:mt-16">
      <h1 className="text-center text-3xl font-medium">
        Welcome to <GradientText>Expert Social Media Management</GradientText>
      </h1>
      <h2 className="text-xl">Thanks for choosing our platform!</h2>
      <h3 className="mt-4 text-center text-lg">
        Please make sure we have your up-to-date details.
      </h3>
      <div className="mt-2 flex h-4 min-h-fit flex-row items-center gap-3">
        <UserAvatar name={user.name} />
        <div>
          <UserDetailsRow label="Name" value={user.name} />
          <UserDetailsRow label="Email" value={user.email} />
        </div>
      </div>
      <p className="mt-4 text-xs font-thin italic">
        To sign out, please refresh the website
      </p>
    </div>
  );
};

export const Route = createFileRoute("/welcome")({
  component: Welcome,
  loader: async () => {
    // this could handle slow queries better - now it will not display anything until the data is fetched
    const promise = store.dispatch(authApi.endpoints.getUser.initiate({}));

    try {
      // waif for result
      const { data, isSuccess } = await promise;

      if (isSuccess === true) {
        return data;
      }

      throw new Error("Failed to fetch user data");
    } catch (error) {
      console.error("Error loading user data:", error);

      // this should be handled differently, because error could be due to network issues or anything
      // and clearing token will force user to login again
      // but for the sake of this example, we are clearing the token to prevent infinite loop
      store.dispatch({ type: "auth/setToken", payload: null });

      throw redirect({ to: "/login" });
    } finally {
      // cleanup the subscription
      promise.unsubscribe();
    }
  },
  beforeLoad: async () => {
    // all "authenticated routes" should be wrapped with some check
    // making something reusable would be a better solution
    const token = store.getState().auth.token;
    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

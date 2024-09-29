import { createLazyFileRoute } from "@tanstack/react-router";
import image from "@/assets/image.webp";
import Icon from "@/components/Icon";
import GradientText from "@/components/GradientText";

const Index = () => {
  return (
    <main className="flex flex-col items-center gap-8 px-4 sm:mt-8 md:flex-row-reverse md:justify-between lg:mt-24">
      <div className="flex flex-col items-center md:items-end">
        <img
          src={image}
          loading="lazy"
          className="max-w-[80%] sm:max-w-[70%]"
        />
        <div className="flex w-full justify-end gap-1 text-sm">
          <span>Designed by</span>
          <a
            href={"https://www.freepik.com"}
            target={"_blank"}
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            Freepik
          </a>
          <Icon name={"external-link"} className="h-3 w-3" />
        </div>
      </div>
      <div className="md:max-w-[40%]">
        <h1 className="text-3xl font-medium">
          Boost Your Brand’s Presence with{" "}
          <GradientText>Expert Social Media Management</GradientText>
        </h1>
        <p className="mt-4 text-lg">
          Amplify your online reach and engage your audience with our tailored
          social media strategies. From content creation to community
          management, we handle everything so you can focus on what matters
          most—growing your business. Partner with us to turn followers into
          loyal customers!
        </p>
      </div>
    </main>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});

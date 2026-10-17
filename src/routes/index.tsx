import { createFileRoute } from "@tanstack/react-router";
import { Invitation } from "@/components/invitation/Invitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Anaya — Wedding Invitation, 14 February 2027" },
      { name: "description", content: "You are warmly invited to celebrate the wedding of Aarav & Anaya at The Grand Pavilion." },
      { property: "og:title", content: "Aarav & Anaya — Wedding Invitation" },
      { property: "og:description", content: "Join us on 14 February 2027 at The Grand Pavilion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

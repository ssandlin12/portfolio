"use client";

import FluentContent from "../fluent/content";

export default function TeamsContent() {
  return (
    <FluentContent
      title="Microsoft Teams"
      subtitle="“How do you build an atom to template pipeline for the world's largest enterprise app?”"
      linkHref="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software"
      linkLabel="Microsoft Teams"
      videoSrc="/teams-hero.mp4"
      previewSrc="/case-studies/teams/teams-web-desktop-cover.png"
      previewWidth={1920}
      previewHeight={1080}
      secondaryPreviewSrc="/case-studies/teams/teams-basic-screens-cover.png"
      secondaryPreviewWidth={3840}
      secondaryPreviewHeight={2160}
      descriptors={["Design systems", "Basic screens", "Templates"]}
      study="teams"
    />
  );
}

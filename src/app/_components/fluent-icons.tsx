import {
  ArrowLeft16Regular,
  Dismiss20Regular,
  FullScreenMaximize20Regular,
  Open16Regular,
} from "@fluentui/react-icons";

type IconProps = {
  className?: string;
};

export function BackIcon({ className }: IconProps) {
  return <ArrowLeft16Regular className={className} aria-hidden="true" />;
}

export function ExternalLinkIcon({ className }: IconProps) {
  return <Open16Regular className={className} aria-hidden="true" />;
}

export function CloseIcon({ className }: IconProps) {
  return <Dismiss20Regular className={className} aria-hidden="true" />;
}

export function ExpandIcon({ className }: IconProps) {
  return <FullScreenMaximize20Regular className={className} aria-hidden="true" />;
}

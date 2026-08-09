import KatesWebsiteV3 from "@/components/KatesWebsiteV3";

// V3 is the homepage. It renders the desktop design above `md` and falls
// through to V2 below it, so mobile is unchanged. /v3 still points at the same
// component — keep it as the preview URL while iterating.
export default function Home() {
  return <KatesWebsiteV3 />;
}

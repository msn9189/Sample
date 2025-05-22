// تعریف تایپ برای ساختار app
interface App {
  url: string;
  webhook?: string;
}

// تعریف تایپ برای کل Manifest
interface FarcasterManifest {
  version: string;
  name: string;
  description: string;
  icon: string;
  app: App;
  [key: string]: undefined | string | string[] | App;
}

function withValidProperties(properties: FarcasterManifest) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "object" && value !== null) {
        return Object.keys(value).length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL =
    process.env.NEXT_PUBLIC_URL || "https://diary-xi-mocha.vercel.app";

  return Response.json(
    withValidProperties({
      version: "v1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Diary MiniApp",
      description:
        process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
        "A miniapp to mint your memories as NFTs on Base",
      icon: process.env.NEXT_PUBLIC_APP_ICON || `${URL}/icon.png`,
      app: {
        url: URL,
        webhook: `${URL}/api/webhook`,
      },
    }),
  );
}

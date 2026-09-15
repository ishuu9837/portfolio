const STORAGE_PATH_PREFIX = "v1/storage/presign/get";

type VercelRequest = {
  method?: string;
  query: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  redirect(status: number, url: string): void;
  send(body: string): void;
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pathSegments = req.query.path;
  const storagePath = Array.isArray(pathSegments)
    ? pathSegments.join("/")
    : pathSegments;

  if (req.method !== "GET" || !storagePath) {
    res.status(400).send("Missing storage key");
    return;
  }

  const forgeBaseUrl = process.env.BUILT_IN_FORGE_API_URL?.replace(/\/+$/, "");
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeBaseUrl || !forgeKey) {
    res.status(503).send("Storage proxy is not configured");
    return;
  }

  try {
    const storageUrl = new URL(STORAGE_PATH_PREFIX, `${forgeBaseUrl}/`);
    storageUrl.searchParams.set("path", storagePath);

    const response = await fetch(storageUrl, {
      headers: { Authorization: `Bearer ${forgeKey}` },
    });

    if (!response.ok) {
      res.status(502).send("Storage backend error");
      return;
    }

    const { url } = (await response.json()) as { url?: string };
    if (!url) {
      res.status(502).send("Storage backend returned an empty URL");
      return;
    }

    res.setHeader("Cache-Control", "no-store");
    res.redirect(307, url);
  } catch {
    res.status(502).send("Storage proxy error");
  }
}

const getConfig = () => ({
  url: process.env.LISTMONK_URL ?? "http://localhost:9000",
  user: process.env.LISTMONK_API_USER ?? "admin",
  pass: process.env.LISTMONK_API_PASSWORD ?? "",
});

function authHeader() {
  const { user, pass } = getConfig();
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

export async function subscribeToList(
  email: string,
  name: string,
  listIds: number[],
) {
  const { url } = getConfig();

  const res = await fetch(`${url}/api/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      email,
      name,
      status: "enabled",
      lists: listIds,
    }),
  });

  if (res.ok) return res.json();

  // Subscriber already exists — add to lists
  if (res.status === 409) {
    const existing = await fetch(
      `${url}/api/subscribers?query=subscribers.email='${encodeURIComponent(email)}'`,
      {
        headers: { Authorization: authHeader() },
      },
    );
    const data = await existing.json();
    const subscriber = data?.data?.results?.[0];

    if (subscriber) {
      await fetch(`${url}/api/subscribers/lists`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({
          ids: [subscriber.id],
          action: "add",
          target_list_ids: listIds,
        }),
      });
      return subscriber;
    }
  }

  throw new Error(`Listmonk API error: ${res.status}`);
}

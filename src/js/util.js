export async function apiCall(route, data) {
  return fetch(`/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data || {}),
  });
}
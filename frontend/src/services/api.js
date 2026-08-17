const API_URL = "http://localhost:5000";

export async function generateStudyMaterial(topic, signal) {
  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
    }),
    signal,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
        "Unable to generate study material."
    );
  }

  return data;
}
export async function submitApplication(formData) {
  const res = await fetch("/api/careers", { method: "POST", body: formData });
  if (!res.ok) throw new Error("Application failed");
  return res.json();
}
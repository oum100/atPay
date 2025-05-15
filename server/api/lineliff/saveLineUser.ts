

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("LINE user info:", body);
  // Save to DB if needed
  return { status: "ok" };
});

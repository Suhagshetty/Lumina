// Load environment variables FIRST
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

// Verify it loaded
console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

// NOW import db (after env is loaded)
import("./index").then(async ({ db }) => {
  const { users } = await import("./schema");

  try {
    console.log("Testing database connection...");
    const result = await db.select().from(users);
    console.log("✅ Database connected! Users count:", result.length);
  } catch (error) {
    console.error("❌ Database error:", error);
  }
  process.exit(0);
});

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export async function POST() {
  console.log("JWT", JWT_SECRET);
}

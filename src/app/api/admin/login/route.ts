import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "virajit@2024";

    if (username === expectedUser && password === expectedPass) {
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
      });

      // Set auth cookie
      response.cookies.set("virajit_admin_token", "authorized", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin username or password" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Server error during authentication" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import nangoBackend from "@/lib/nango-backend";

export async function POST(req: NextRequest) {
  const { endUserId, endUserEmail, endUserDisplayName, integrationId } =
    await req.json();

  try {
    const session = await nangoBackend.createConnectSession({
      end_user: {
        id: endUserId,
        email: endUserEmail,
        display_name: endUserDisplayName,
      },
      allowed_integrations: [integrationId],
    });

    return NextResponse.json({ sessionToken: session.token });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

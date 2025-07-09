import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Configuración OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
);

// POST - Intercambiar código por tokens
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/auth/google - Request received');

    const body = await request.json();
    const { code } = body;

    console.log('Authorization code received:', code ? 'Yes' : 'No');

    if (!code) {
      console.log('Error: No authorization code provided');
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    console.log('Exchanging code for tokens...');
    // Intercambiar código por tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens received successfully');
    
    // Verificar que tenemos los tokens necesarios
    if (!tokens.access_token) {
      return NextResponse.json(
        { error: 'Failed to obtain access token' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
        token_type: tokens.token_type,
        scope: tokens.scope
      }
    });

  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.json(
      { error: `Failed to exchange authorization code: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// GET - Refrescar token de acceso
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refreshToken = searchParams.get('refresh_token');

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Configurar el refresh token
    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    // Refrescar el token
    const { credentials } = await oauth2Client.refreshAccessToken();

    return NextResponse.json({
      tokens: {
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
        expiry_date: credentials.expiry_date,
        token_type: credentials.token_type,
        scope: credentials.scope
      }
    });

  } catch (error) {
    console.error('Error refreshing access token:', error);
    return NextResponse.json(
      { error: 'Failed to refresh access token' },
      { status: 500 }
    );
  }
}

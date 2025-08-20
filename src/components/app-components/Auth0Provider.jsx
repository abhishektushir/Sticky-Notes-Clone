import React, { useContext } from "react";
import { Auth0Provider as Auth0ProviderBase, useAuth0 } from "@auth0/auth0-react";




export const Auth0Provider = ({ children }) => {
  // Demo Auth0 configuration - replace with your actual values
  // For production, you would get these from your environment variables
  const domain = "dev-cx5reexivemetban.us.auth0.com"; // Replace with your Auth0 domain
  const clientId = "V14WyDohIRw3u3GGGQ59aFEsGGr1fpSZ"; // Replace with your Auth0 client ID
  const redirectUri = window.location.origin;

  return (
    <Auth0ProviderBase
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage">
      {children}
    </Auth0ProviderBase>
  );
};

export const config = {
  userPoolId: 'us-east-1_k6ka2yoSi',
  userPoolWebClientId: '4qs4uujnngggvf8i420fg5edbc',
  oauth: {
    domain: 'totalfitcr-dev.auth.us-east-1.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'http://localhost:3000',
    redirectSignOut: 'http://localhost:3000/logout',
    responseType: 'token', // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
};

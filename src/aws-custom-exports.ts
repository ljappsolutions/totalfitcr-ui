export const config = {
  userPoolId: 'us-east-1_QPxsYBMvD',
  userPoolWebClientId: '5tr88qdi3biq6eobh7pmcrpr0t',
  oauth: {
    domain: 'auth-dev.firstfactory.com',
    scope: [
      'phone',
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'http://localhost:3000',
    redirectSignOut: 'http://localhost:3006/logout',
    responseType: 'token', // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
};

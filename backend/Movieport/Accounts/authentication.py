from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
    def get_raw_token(self, header):
        if not header:
            return None

        parts = header.split()

        if len(parts) == 1:
            return parts[0]
        elif len(parts) == 2:
            return parts[1]
        else:
            raise Exception('Invalid Authorization header format')

    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return None

        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), None
from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if isinstance(exc, (AuthenticationFailed, NotAuthenticated)):
            response.status_code = 401  

    return response

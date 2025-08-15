# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerLogin**](#authcontrollerlogin) | **POST** /api/auth/login | Grant access to all users|
|[**authControllerRegister**](#authcontrollerregister) | **POST** /api/auth/register | User registration|

# **authControllerLogin**
> AuthControllerLogin200Response authControllerLogin(loginRequestDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginRequestDto: LoginRequestDto; //

const { status, data } = await apiInstance.authControllerLogin(
    loginRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDto** | **LoginRequestDto**|  | |


### Return type

**AuthControllerLogin200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Login successful |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRegister**
> AuthControllerRegister200Response authControllerRegister(registrationRequestDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    RegistrationRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let registrationRequestDto: RegistrationRequestDto; //

const { status, data } = await apiInstance.authControllerRegister(
    registrationRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registrationRequestDto** | **RegistrationRequestDto**|  | |


### Return type

**AuthControllerRegister200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Register user |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


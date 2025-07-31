# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**usersControllerActivateUser**](#userscontrolleractivateuser) | **POST** /api/users/{id}/activate | Activate user account. Accessible only by SUPER_ADMIN and ADMIN|
|[**usersControllerGetUser**](#userscontrollergetuser) | **GET** /api/users/{id} | Returns specific user. Accessible only by SUPER_ADMIN and ADMIN|
|[**usersControllerGetUsers**](#userscontrollergetusers) | **GET** /api/users | Returns list of users. Accessible only by SUPER_ADMIN and ADMIN|
|[**usersControllerSuspendUser**](#userscontrollersuspenduser) | **POST** /api/users/{id}/suspend | Suspend user account. Accessible only by SUPER_ADMIN and ADMIN|

# **usersControllerActivateUser**
> AuthControllerRegister200Response usersControllerActivateUser()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.usersControllerActivateUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**AuthControllerRegister200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Activate user account |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersControllerGetUser**
> AuthControllerRegister200Response usersControllerGetUser()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.usersControllerGetUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**AuthControllerRegister200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersControllerGetUsers**
> UsersControllerGetUsers200Response usersControllerGetUsers()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let page: number; // (optional) (default to 1)
let pageSize: number; // (optional) (default to 10)
let role: 'SUPER_ADMIN' | 'ADMIN' | 'SHIPPER' | 'VENDOR' | 'DISPATCHER'; // (optional) (default to undefined)
let status: 'ACTIVE' | 'SUSPENDED'; // (optional) (default to undefined)

const { status, data } = await apiInstance.usersControllerGetUsers(
    page,
    pageSize,
    role,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 1|
| **pageSize** | [**number**] |  | (optional) defaults to 10|
| **role** | [**&#39;SUPER_ADMIN&#39; | &#39;ADMIN&#39; | &#39;SHIPPER&#39; | &#39;VENDOR&#39; | &#39;DISPATCHER&#39;**]**Array<&#39;SUPER_ADMIN&#39; &#124; &#39;ADMIN&#39; &#124; &#39;SHIPPER&#39; &#124; &#39;VENDOR&#39; &#124; &#39;DISPATCHER&#39;>** |  | (optional) defaults to undefined|
| **status** | [**&#39;ACTIVE&#39; | &#39;SUSPENDED&#39;**]**Array<&#39;ACTIVE&#39; &#124; &#39;SUSPENDED&#39;>** |  | (optional) defaults to undefined|


### Return type

**UsersControllerGetUsers200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Paginated users |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersControllerSuspendUser**
> AuthControllerRegister200Response usersControllerSuspendUser()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.usersControllerSuspendUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**AuthControllerRegister200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Suspend user account |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


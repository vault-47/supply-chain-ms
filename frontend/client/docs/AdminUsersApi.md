# AdminUsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**adminUsersControllerActivateUser**](#adminuserscontrolleractivateuser) | **POST** /api/admin/users/{id}/activate | Activate user account. Accessible only by PLATFORM_ADMIN|
|[**adminUsersControllerGetUsers**](#adminuserscontrollergetusers) | **GET** /api/admin/users | Returns list of users. Accessible only by PLATFORM_ADMIN|
|[**adminUsersControllerSuspendUser**](#adminuserscontrollersuspenduser) | **POST** /api/admin/users/{id}/suspend | Suspend user account. Accessible only by PLATFORM_ADMIN|

# **adminUsersControllerActivateUser**
> AuthControllerRegister200Response adminUsersControllerActivateUser()


### Example

```typescript
import {
    AdminUsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let id: string; //id (default to undefined)

const { status, data } = await apiInstance.adminUsersControllerActivateUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | id | defaults to undefined|


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

# **adminUsersControllerGetUsers**
> AdminUsersControllerGetUsers200Response adminUsersControllerGetUsers()


### Example

```typescript
import {
    AdminUsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let page: number; //page (optional) (default to 1)
let pageSize: number; //pageSize (optional) (default to 10)
let role: 'PLATFORM_ADMIN' | 'SHIPPER' | 'VENDOR' | 'DRIVER'; //role (optional) (default to undefined)
let accountStatus: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION' | 'INVITED'; //accountStatus (optional) (default to undefined)

const { status, data } = await apiInstance.adminUsersControllerGetUsers(
    page,
    pageSize,
    role,
    accountStatus
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | page | (optional) defaults to 1|
| **pageSize** | [**number**] | pageSize | (optional) defaults to 10|
| **role** | [**&#39;PLATFORM_ADMIN&#39; | &#39;SHIPPER&#39; | &#39;VENDOR&#39; | &#39;DRIVER&#39;**]**Array<&#39;PLATFORM_ADMIN&#39; &#124; &#39;SHIPPER&#39; &#124; &#39;VENDOR&#39; &#124; &#39;DRIVER&#39;>** | role | (optional) defaults to undefined|
| **accountStatus** | [**&#39;ACTIVE&#39; | &#39;SUSPENDED&#39; | &#39;PENDING_VERIFICATION&#39; | &#39;INVITED&#39;**]**Array<&#39;ACTIVE&#39; &#124; &#39;SUSPENDED&#39; &#124; &#39;PENDING_VERIFICATION&#39; &#124; &#39;INVITED&#39;>** | accountStatus | (optional) defaults to undefined|


### Return type

**AdminUsersControllerGetUsers200Response**

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

# **adminUsersControllerSuspendUser**
> AuthControllerRegister200Response adminUsersControllerSuspendUser()


### Example

```typescript
import {
    AdminUsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminUsersApi(configuration);

let id: string; //id (default to undefined)

const { status, data } = await apiInstance.adminUsersControllerSuspendUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | id | defaults to undefined|


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


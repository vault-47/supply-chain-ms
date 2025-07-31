# InvitesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**invitesControllerAcceptInvite**](#invitescontrolleracceptinvite) | **POST** /api/invites/{invite_code}/accept | User i.e admins, shippers and vendors complete onboarding|
|[**invitesControllerInvite**](#invitescontrollerinvite) | **POST** /api/invites | Admins send invite to ADMIN, SHIPPER and VENDOR|
|[**invitesControllerInvites**](#invitescontrollerinvites) | **GET** /api/invites | Returns list of invites. Accessible only by SUPER_ADMIN and ADMIN|

# **invitesControllerAcceptInvite**
> AuthControllerRegister200Response invitesControllerAcceptInvite(userAcceptInviteRequestDto)


### Example

```typescript
import {
    InvitesApi,
    Configuration,
    UserAcceptInviteRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitesApi(configuration);

let inviteCode: string; //invite code (default to undefined)
let userAcceptInviteRequestDto: UserAcceptInviteRequestDto; //

const { status, data } = await apiInstance.invitesControllerAcceptInvite(
    inviteCode,
    userAcceptInviteRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userAcceptInviteRequestDto** | **UserAcceptInviteRequestDto**|  | |
| **inviteCode** | [**string**] | invite code | defaults to undefined|


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
|**200** | Successfully accepted invitation |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invitesControllerInvite**
> SendInvitationResponseWrapperDto invitesControllerInvite(inviteUserRequestDto)


### Example

```typescript
import {
    InvitesApi,
    Configuration,
    InviteUserRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitesApi(configuration);

let inviteUserRequestDto: InviteUserRequestDto; //

const { status, data } = await apiInstance.invitesControllerInvite(
    inviteUserRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inviteUserRequestDto** | **InviteUserRequestDto**|  | |


### Return type

**SendInvitationResponseWrapperDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully sent invitation |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invitesControllerInvites**
> InvitesControllerInvites200Response invitesControllerInvites()


### Example

```typescript
import {
    InvitesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvitesApi(configuration);

let page: number; // (optional) (default to 1)
let pageSize: number; // (optional) (default to 10)
let role: 'ADMIN' | 'VENDOR' | 'SHIPPER' | 'DISPATCHER'; // (optional) (default to undefined)

const { status, data } = await apiInstance.invitesControllerInvites(
    page,
    pageSize,
    role
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 1|
| **pageSize** | [**number**] |  | (optional) defaults to 10|
| **role** | [**&#39;ADMIN&#39; | &#39;VENDOR&#39; | &#39;SHIPPER&#39; | &#39;DISPATCHER&#39;**]**Array<&#39;ADMIN&#39; &#124; &#39;VENDOR&#39; &#124; &#39;SHIPPER&#39; &#124; &#39;DISPATCHER&#39;>** |  | (optional) defaults to undefined|


### Return type

**InvitesControllerInvites200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Paginated invites |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


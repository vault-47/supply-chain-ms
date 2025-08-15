# ProfileApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**profileControllerProfile**](#profilecontrollerprofile) | **GET** /api/profile | Current user profile|

# **profileControllerProfile**
> AuthControllerRegister200Response profileControllerProfile()


### Example

```typescript
import {
    ProfileApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProfileApi(configuration);

const { status, data } = await apiInstance.profileControllerProfile();
```

### Parameters
This endpoint does not have any parameters.


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
|**200** | Current user profile |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


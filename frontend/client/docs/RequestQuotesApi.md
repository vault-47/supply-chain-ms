# RequestQuotesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**requestQuotesControllerListRequestedQuotes**](#requestquotescontrollerlistrequestedquotes) | **GET** /api/request-quotes | List requested quotes 🚧|
|[**requestQuotesControllerRequestQuote**](#requestquotescontrollerrequestquote) | **POST** /api/request-quotes | Request quote 🚧|
|[**requestQuotesControllerRequestQuoteDetail**](#requestquotescontrollerrequestquotedetail) | **GET** /api/request-quotes/{id} | Details of requested quote, should also return corresponding quotes 🚧|

# **requestQuotesControllerListRequestedQuotes**
> requestQuotesControllerListRequestedQuotes()


### Example

```typescript
import {
    RequestQuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RequestQuotesApi(configuration);

const { status, data } = await apiInstance.requestQuotesControllerListRequestedQuotes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **requestQuotesControllerRequestQuote**
> RequestQuoteRequestDto requestQuotesControllerRequestQuote(requestQuoteRequestDto)


### Example

```typescript
import {
    RequestQuotesApi,
    Configuration,
    RequestQuoteRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new RequestQuotesApi(configuration);

let requestQuoteRequestDto: RequestQuoteRequestDto; //

const { status, data } = await apiInstance.requestQuotesControllerRequestQuote(
    requestQuoteRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestQuoteRequestDto** | **RequestQuoteRequestDto**|  | |


### Return type

**RequestQuoteRequestDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Quote request sent successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **requestQuotesControllerRequestQuoteDetail**
> requestQuotesControllerRequestQuoteDetail()


### Example

```typescript
import {
    RequestQuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RequestQuotesApi(configuration);

const { status, data } = await apiInstance.requestQuotesControllerRequestQuoteDetail();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


# QuoteRequestsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**quoteRequestsControllerListRequestedQuotes**](#quoterequestscontrollerlistrequestedquotes) | **GET** /api/quotes-requests | List requested quotes|
|[**quoteRequestsControllerRequestQuote**](#quoterequestscontrollerrequestquote) | **POST** /api/quotes-requests | Request a quote|
|[**quoteRequestsControllerRequestQuoteDetail**](#quoterequestscontrollerrequestquotedetail) | **GET** /api/quotes-requests/{id} | Details of requested quote, should also return corresponding quotes|
|[**quoteRequestsControllerRespondQuoteRequest**](#quoterequestscontrollerrespondquoterequest) | **POST** /api/quotes-requests/{id}/respond | Respond to a quote request. This creates a quote 🚧|

# **quoteRequestsControllerListRequestedQuotes**
> QuoteRequestsControllerListRequestedQuotes200Response quoteRequestsControllerListRequestedQuotes()


### Example

```typescript
import {
    QuoteRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuoteRequestsApi(configuration);

let page: number; //page (optional) (default to 1)
let pageSize: number; //pageSize (optional) (default to 10)
let urgency: 'STANDARD' | 'EXPRESS'; //urgency (optional) (default to undefined)
let search: string; //search (optional) (default to undefined)

const { status, data } = await apiInstance.quoteRequestsControllerListRequestedQuotes(
    page,
    pageSize,
    urgency,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | page | (optional) defaults to 1|
| **pageSize** | [**number**] | pageSize | (optional) defaults to 10|
| **urgency** | [**&#39;STANDARD&#39; | &#39;EXPRESS&#39;**]**Array<&#39;STANDARD&#39; &#124; &#39;EXPRESS&#39;>** | urgency | (optional) defaults to undefined|
| **search** | [**string**] | search | (optional) defaults to undefined|


### Return type

**QuoteRequestsControllerListRequestedQuotes200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | quote requests list |  -  |
|**401** | Unathorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quoteRequestsControllerRequestQuote**
> QuoteRequestsControllerRequestQuote200Response quoteRequestsControllerRequestQuote(createRequestQuoteRequestDto)


### Example

```typescript
import {
    QuoteRequestsApi,
    Configuration,
    CreateRequestQuoteRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new QuoteRequestsApi(configuration);

let createRequestQuoteRequestDto: CreateRequestQuoteRequestDto; //

const { status, data } = await apiInstance.quoteRequestsControllerRequestQuote(
    createRequestQuoteRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRequestQuoteRequestDto** | **CreateRequestQuoteRequestDto**|  | |


### Return type

**QuoteRequestsControllerRequestQuote200Response**

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

# **quoteRequestsControllerRequestQuoteDetail**
> QuoteRequestsControllerRequestQuote200Response quoteRequestsControllerRequestQuoteDetail()


### Example

```typescript
import {
    QuoteRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuoteRequestsApi(configuration);

let id: string; //id (default to undefined)

const { status, data } = await apiInstance.quoteRequestsControllerRequestQuoteDetail(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | id | defaults to undefined|


### Return type

**QuoteRequestsControllerRequestQuote200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | quote request detail |  -  |
|**401** | Unathorized |  -  |
|**404** | Quote request not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **quoteRequestsControllerRespondQuoteRequest**
> quoteRequestsControllerRespondQuoteRequest()


### Example

```typescript
import {
    QuoteRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuoteRequestsApi(configuration);

const { status, data } = await apiInstance.quoteRequestsControllerRespondQuoteRequest();
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


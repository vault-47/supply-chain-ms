# QuotesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**quotesControllerAcceptQuote**](#quotescontrolleracceptquote) | **POST** /api/quotes/{id}/accept | Accept quote 🚧|
|[**quotesControllerCreateQuote**](#quotescontrollercreatequote) | **POST** /api/quotes | Create quote 🚧|
|[**quotesControllerGetQuote**](#quotescontrollergetquote) | **GET** /api/quotes/{id} | Fetch quote details 🚧|
|[**quotesControllerGetQuotes**](#quotescontrollergetquotes) | **GET** /api/quotes | Fetch quotes 🚧|
|[**quotesControllerRejectQuote**](#quotescontrollerrejectquote) | **POST** /api/quotes/{id}/reject | Reject quote 🚧|

# **quotesControllerAcceptQuote**
> quotesControllerAcceptQuote()


### Example

```typescript
import {
    QuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuotesApi(configuration);

const { status, data } = await apiInstance.quotesControllerAcceptQuote();
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

# **quotesControllerCreateQuote**
> quotesControllerCreateQuote()


### Example

```typescript
import {
    QuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuotesApi(configuration);

const { status, data } = await apiInstance.quotesControllerCreateQuote();
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

# **quotesControllerGetQuote**
> quotesControllerGetQuote()


### Example

```typescript
import {
    QuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuotesApi(configuration);

const { status, data } = await apiInstance.quotesControllerGetQuote();
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

# **quotesControllerGetQuotes**
> quotesControllerGetQuotes()


### Example

```typescript
import {
    QuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuotesApi(configuration);

const { status, data } = await apiInstance.quotesControllerGetQuotes();
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

# **quotesControllerRejectQuote**
> quotesControllerRejectQuote()


### Example

```typescript
import {
    QuotesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuotesApi(configuration);

const { status, data } = await apiInstance.quotesControllerRejectQuote();
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


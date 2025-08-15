# RegistrationRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** | email | [default to undefined]
**password** | **string** | password | [default to undefined]
**repeat_password** | **string** | Repeat password | [default to undefined]
**first_name** | **string** | first_name | [default to undefined]
**last_name** | **string** | last_name | [default to undefined]
**role** | **string** | Role must be one of PLATFORM_ADMIN | [default to undefined]

## Example

```typescript
import { RegistrationRequestDto } from './api';

const instance: RegistrationRequestDto = {
    email,
    password,
    repeat_password,
    first_name,
    last_name,
    role,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

# QuoteRequestResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | id | [default to undefined]
**qr_num** | **string** | qr_num | [default to undefined]
**origin_address** | **string** | origin_address | [default to undefined]
**destination_address** | **string** | destination_address | [default to undefined]
**distance_km** | **number** | distance_km | [default to undefined]
**weight_kg** | **number** | weight_kg | [default to undefined]
**goods_type** | **string** | goods_type | [default to undefined]
**additional_note** | **string** | additional_note | [default to undefined]
**urgency** | **string** | urgency | [default to 'STANDARD']
**status** | **string** | status | [default to undefined]
**created_at** | **object** |  | [optional] [default to undefined]
**user** | [**UserResponseDto**](UserResponseDto.md) | user | [default to undefined]
**vendor** | [**UserResponseDto**](UserResponseDto.md) | vendor | [default to undefined]

## Example

```typescript
import { QuoteRequestResponseDto } from './api';

const instance: QuoteRequestResponseDto = {
    id,
    qr_num,
    origin_address,
    destination_address,
    distance_km,
    weight_kg,
    goods_type,
    additional_note,
    urgency,
    status,
    created_at,
    user,
    vendor,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

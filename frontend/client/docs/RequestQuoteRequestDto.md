# RequestQuoteRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**vendor_uid** | **string** | vendor_uid | [default to undefined]
**origin_address** | **string** | origin_address | [default to undefined]
**destination_address** | **string** | destination_address | [default to undefined]
**distance_km** | **number** | distance_km | [default to undefined]
**weight_kg** | **number** | weight_kg | [default to undefined]
**goods_type** | **string** | goods_type | [default to undefined]
**additional_note** | **string** | additional_note | [default to undefined]
**urgency** | **string** | urgency | [default to 'STANDARD']

## Example

```typescript
import { RequestQuoteRequestDto } from './api';

const instance: RequestQuoteRequestDto = {
    vendor_uid,
    origin_address,
    destination_address,
    distance_km,
    weight_kg,
    goods_type,
    additional_note,
    urgency,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

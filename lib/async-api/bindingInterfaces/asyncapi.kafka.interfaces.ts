// https://github.com/asyncapi/bindings/tree/master/kafka
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

// tslint:disable-next-line: no-empty-interface
export interface KafkaServerBindingObject {}

// tslint:disable-next-line: no-empty-interface
export interface KafkaChannelBindingObject {}

export interface KafkaOperationBindingObject {
  groupId?: SchemaObject;
  clientId?: SchemaObject;
  bindingVersion?: string;
}

export interface KafkaMessageBindingObject {
  key?: SchemaObject;
  bindingVersion?: string;
}

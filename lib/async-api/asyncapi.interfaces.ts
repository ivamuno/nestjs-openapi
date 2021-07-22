import {
  InfoObject,
  ReferenceObject,
  SchemaObject,
  ServerObject,
  ServerVariableObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import {
  AmqpChannelBindingObject,
  AmqpMessageBindingObject,
  AmqpOperationBindingObject,
  AmqpServerBindingObject,
  KafkaChannelBindingObject,
  KafkaMessageBindingObject,
  KafkaOperationBindingObject,
  KafkaServerBindingObject,
} from './bindingInterfaces';

export interface AsyncAPIObject {
  asyncapi: string;
  id?: string;
  info: InfoObject;
  servers?: Record<string, AsyncServerObject>;
  channels: AsyncChannelsObject;
  components?: AyncComponentsObject;
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
  defaultContentType?: string;
}

export type AsyncChannelsObject = Record<string, AsyncChannelObject>;
export interface AsyncChannelObject {
  description?: string;
  subscribe?: AsyncOperationObject;
  publish?: AsyncOperationObject;
  parameters?: Record<string, ParameterObject>;
  bindings?: Record<string, KafkaChannelBindingObject | AmqpChannelBindingObject>;
}

export interface AsyncServerVariableObject extends ServerVariableObject {
  examples?: string[];
}

export interface AsyncServerObject extends Omit<ServerObject, 'variables'> {
  variables?: Record<string, AsyncServerVariableObject>;
  protocol: string;
  protocolVersion?: string;
  security?: SecurityObject[];
  bindings?: Record<string, KafkaServerBindingObject | AmqpServerBindingObject>;
}

export interface SecurityObject extends Record<string, string[]> {}

export interface AyncComponentsObject {
  schemas?: Record<string, SchemaObject>;
  messages?: Record<string, AsyncMessageObject>;
  securitySchemes?: Record<string, AsyncSecuritySchemeObject>;
  parameters?: Record<string, ParameterObject>;
  correlationIds?: Record<string, AsyncCorrelationObject>;
  operationTraits?: Record<string, AsyncOperationTraitObject>;
  messageTraits?: Record<string, AsyncMessageTraitObject>;
  serverBindings?: Record<string, KafkaServerBindingObject | AmqpServerBindingObject>;
  channelBindings?: Record<string, KafkaChannelBindingObject | AmqpChannelBindingObject>;
  operationBindings?: Record<string, KafkaOperationBindingObject | AmqpOperationBindingObject>;
  messageBindings?: Record<string, KafkaMessageBindingObject | AmqpMessageBindingObject>;
}

export interface AsyncMessageObject extends AsyncMessageTraitObject {
  payload?: any;
  traits?: AsyncMessageTraitObject;
}

export interface AsyncOperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
  bindings?: Record<string, KafkaOperationBindingObject | AmqpOperationBindingObject>;
  traits?: Record<string, AsyncOperationTraitObject>;
  message?: AsyncMessageObject | ReferenceObject;
}

export interface AsyncOperationTraitObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
  bindings?: Record<string, KafkaOperationBindingObject | AmqpOperationBindingObject>;
}

export interface AsyncMessageTraitObject {
  headers?: SchemaObject;
  correlationId?: AsyncCorrelationObject;
  schemaFormat?: string;
  contentType?: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  tags?: AsyncTagObject[];
  externalDocs?: ExternalDocumentationObject;
  bindings?: Record<string, KafkaMessageBindingObject | AmqpMessageBindingObject>;
  examples?: ExamplesObject;
}

export interface AsyncCorrelationObject {
  description?: string;
  location: string;
}

export interface AsyncTagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export interface AsyncSecuritySchemeObject {
  type: SecuritySchemeType;
  description?: string;
  name?: string;
  in?: string;
  scheme?: string;
  bearerFormat?: string;
  flows?: OAuthFlowsObject;
  openIdConnectUrl?: string;
}

export declare type SecuritySchemeType =
  | 'userPassword'
  | 'apiKey'
  | 'X509'
  | 'symmetricEncryption'
  | 'asymmetricEncryption'
  | 'http'
  | 'oauth2'
  | 'openIdConnect';

export interface OAuthFlowsObject {
  implicit?: OAuthFlowObject;
  password?: OAuthFlowObject;
  clientCredentials?: OAuthFlowObject;
  authorizationCode?: OAuthFlowObject;
}

export interface OAuthFlowObject {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: ScopesObject;
}

export type ScopesObject = Record<string, any>;

export interface DiscriminatorObject {
  propertyName: string;
  mapping?: Record<string, string>;
}

// tslint:disable-next-line: no-empty-interface
export interface ParameterObject extends BaseParameterObject {}

export interface BaseParameterObject {
  description?: string;
  schema?: SchemaObject | ReferenceObject;
  location?: string;
}

export interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

export type ContentObject = Record<string, MediaTypeObject>;
export interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject;
  examples?: ExamplesObject;
  example?: any;
  encoding?: EncodingObject;
}

export type ExamplesObject = Record<string, ExampleObject | ReferenceObject>;

export type EncodingObject = Record<string, EncodingPropertyObject>;
export interface EncodingPropertyObject {
  contentType?: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

export type HeaderObject = BaseParameterObject;

export interface ExternalDocumentationObject {
  description?: string;
  url: string;
}

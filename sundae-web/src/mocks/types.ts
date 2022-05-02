import { ResponseResolver, MockedRequest, RestContext } from 'msw';

export type MockedRestHandler<ResponseType> = ResponseResolver<MockedRequest, RestContext, ResponseType>;

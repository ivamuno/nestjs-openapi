import { Injectable } from '@nestjs/common';
import { AsyncApiChannel, AsyncApiPub, KafkaChannelBindingObject, KafkaOperationBindingObject } from '@ivamuno/nestjs-openapi';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatCreatedEvent } from './async/messages';

@Injectable()
@AsyncApiChannel({
    name: 'cats-pub-events:cat-routing-key',
    bindings: {
        kafka: {} as KafkaChannelBindingObject,
    },
})
export class CatsEventsChannel {
    constructor(private readonly catsService: CatsService) {}

    @AsyncApiPub({
        tags: [{ name: 'CatsEvents' }],
        summary: 'Publish Cats Events',
        message: {
            name: 'Cat Event',
            payload: {
                type: CatCreatedEvent,
                examples: {
                    CatCreated: {
                        value: {
                            correlationId: '53312466-e448-432d-8149-29269b5ac522',
                            messageType: 'CatCreated',
                            timestamp: '2020-12-17T03:29:00',
                            version: '1.0.1',
                            payload: {
                                name: 'Kitty',
                                breed: { name: 'Maine Coon', weight: 10 },
                                identifier: 'pet_001',
                            },
                        },
                    },
                },
            },
        },
        bindings: {
            kafka: {
                groupId: {
                    type: 'string',
                    pattern: '^[A-Z]{10}[0-5]$',
                },
                clientId: {
                    type: 'string',
                    pattern: '^[a-z]{22}$',
                },
            } as KafkaOperationBindingObject,
        },
    })
    async subscribe(createCatDto: CreateCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
    }
}

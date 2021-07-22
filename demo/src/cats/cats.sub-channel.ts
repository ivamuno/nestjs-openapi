import { Injectable } from '@nestjs/common';
import { AsyncApiChannel, AsyncApiSub } from '@ivamuno/nestjs-openapi';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreateCatCommand } from './async/messages';

@Injectable()
@AsyncApiChannel({
    name: 'cats-sub-channel',
    bindings: {
        amqp: {
            is: 'queue',
            queue: {
                name: 'cats-sub-channel',
                durable: true,
                exclusive: true,
                autoDelete: false,
                vhost: 'cats',
            },
        },
    },
})
export class CatsSubChannel {
    constructor(private readonly catsService: CatsService) {}

    @AsyncApiSub({
        tags: [{ name: 'CreateCats(RPC)' }],
        summary: 'Create Cat Request',
        description: 'Description for Create Cat Request operation',
        message: {
            name: 'Create Cat Command',
            payload: {
                type: CreateCatCommand,
                examples: {
                    British: {
                        value: {
                            correlationId: '53312466-e448-432d-8149-29269b5ac522',
                            messageId: '309881db-1971-4c63-b905-9ffb7229f979',
                            messageType: 'CreateCatCommand',
                            timestamp: '2020-12-17T03:24:00',
                            version: '1.0.1',
                            payload: { name: 'Yuumi', breed: { name: 'British Shorthair', height: 99 } },
                        },
                    },
                    Maine: {
                        value: {
                            correlationId: '77baeaec-9416-437f-a88f-6a3686ff3a4a',
                            messageId: 'b26f52c0-9a15-41ed-a4df-68e332203737',
                            messageType: 'CreateCatCommand',
                            timestamp: '2020-12-21T03:24:00',
                            version: '1.0.1',
                            payload: { name: 'Kitty', breed: { name: 'Maine Coon', weight: 10 } },
                        },
                    },
                },
            },
        },
        bindings: {
            amqp: {
                deliveryMode: 2,
                mandatory: true,
                timestamp: true,
                ack: false,
            },
        },
    })
    async subscribe(createCatDto: CreateCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
    }
}

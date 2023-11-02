import { Logger } from '@nestjs/common';

export abstract class BaseService {
    protected logger = new Logger(this.constructor.name);

    protected logNotFoundWarning(id: string): void {
        this.logger.warn(`Cannot find ${this.constructor.name} with :id=${id}`);
    }
}

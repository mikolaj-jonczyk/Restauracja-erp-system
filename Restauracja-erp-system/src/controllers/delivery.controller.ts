import { Controller } from '@nestjs/common';
import { DeliveryService } from 'src/services/delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private prescriptionsService: DeliveryService) {}
}

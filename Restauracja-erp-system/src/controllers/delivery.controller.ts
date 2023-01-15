import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res
} from '@nestjs/common';
import { GetDeliveryDto } from 'src/models/delivery/dto/get-delivery.dto';
import { DeliveryService } from 'src/services/delivery.service';
import { Response } from 'express';
import { Log } from 'src/log';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Get()
  @Render('delivery/panel')
  deliveryPanel() {
    this.validateUser();
    return;
  }

  @Get('allDelivery')
  @Render('delivery/allDelivery')
  async allDelivery(@Query() filterDto: GetDeliveryDto) {
    this.validateUser();
    const delivery = await this.deliveryService.getDelivery(filterDto);
    return { delivery };
  }

  @Get('/singleDelivery/:id')
  async singleDelivery(@Param('id') id, @Res() res: Response) {
    this.validateUser();
    const single = await this.deliveryService.getDeliveryById(id);
    return res.render('delivery/singleDelivery', { single });
  }

  @Post('/singleDelivery/deleteDelivery/:id')
  async deleteDeliveryById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<void> {
    this.validateUser();
    await this.deliveryService.deleteDelivery(id);
    return res.redirect('http://localhost:3000/delivery');
  }

  validateUser() {
    if (Log.logged) {
      if (Log.role !== 'delivery') {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return;
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}

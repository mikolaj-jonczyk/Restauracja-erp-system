import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from 'src/models/delivery/delivery.entity';
import { CrateDeliveryDto } from 'src/models/delivery/dto/create-delivery.dto';
import { GetDeliveryDto } from 'src/models/delivery/dto/get-delivery.dto';
import { Status } from 'src/models/tasks/status.enum';
import { DeliveryRepository } from 'src/repositories/delivery.repository';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryRepository)
    private deliveryRepository: DeliveryRepository
  ) {}

  getDelivery(filterDto: GetDeliveryDto): Promise<Delivery[]> {
    return this.deliveryRepository.getDelivery(filterDto);
  }

  async getDeliveryById(id: string): Promise<Delivery> {
    const found = await this.deliveryRepository.findOne({
      where: { id }
    });
    if (!found) {
      throw new NotFoundException(`Delivery with this id "${id}" not found!`);
    }

    return found;
  }

  createDelivery(createDeliveryDto: CrateDeliveryDto): Promise<Delivery> {
    return this.deliveryRepository.createDelivery(createDeliveryDto);
  }

  async deleteDelivery(id: string): Promise<void> {
    const result = await this.deliveryRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Delivery with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string): Promise<Delivery> {
    const delivery = await this.getDeliveryById(id);

    delivery.status = Status.ZREALIZOWANY;
    await this.deliveryRepository.save(delivery);
    return delivery;
  }
}

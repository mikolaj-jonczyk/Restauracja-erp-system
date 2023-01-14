import { Delivery } from 'src/models/delivery/delivery.entity';
import { CrateDeliveryDto } from 'src/models/delivery/dto/create-delivery.dto';
import { GetDeliveryDto } from 'src/models/delivery/dto/get-delivery.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Status } from '../models/tasks/status.enum';

@EntityRepository(Delivery)
export class DeliveryRepository extends Repository<Delivery> {
  async createDelivery(createDeliveryDto: CrateDeliveryDto): Promise<Delivery> {
    const { dateOfCreate, productList } = createDeliveryDto;
    const delivery = this.create({
      dateOfCreate,
      productList,
      status: Status.NIEZREALIZOWANY
    });
    await this.save(delivery);
    return delivery;
  }

  async getDelivery(filterDto: GetDeliveryDto): Promise<Delivery[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('delivery');

    if (status) {
      query.andWhere('delivery.status = :status', {
        status
      });
    }

    if (search) {
      query.andWhere('(LOWER(delivery.description) LIKE LOWER(:search)', {
        search: `%${search}%`
      });
    }

    const tasks = await query.getMany();

    return tasks;
  }
}

import { DeliveryStatus } from './deliveryStatus.enum';

export interface Delivery {
    deliveryId: string;
    dateOfCreate: string;
    productList: string[];
    deliveryStatus: DeliveryStatus;
  }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackageService } from 'entity/venue/venue_package_service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagePriceUpdate {
  constructor(
    @InjectRepository(VenuePackage)
    private readonly venuePackageRepo: Repository<VenuePackage>,

    @InjectRepository(VenuePackageService)
    private readonly venuePackageServiceRepo: Repository<VenuePackageService>,

    @InjectRepository(VenuePackageEquipment)
    private readonly venuePackageEquipmentRepo: Repository<VenuePackageEquipment>,
  ) {}

  async updatePackagePrice(packageId: number): Promise<void> {
    
    const services = await this.venuePackageServiceRepo.find({ where: { package: { id: packageId } } });
    const equipments = await this.venuePackageEquipmentRepo.find({ where: { package: { id: packageId } } });
    
    
    const totalServicePrice = services.reduce((sum, service) => sum + Number(service.price) * service.count, 0);
    const totalEquipmentPrice = equipments.reduce((sum, equipment) => sum + (Number(equipment.price) * equipment.count), 0);
    
    
    const venuePackage = await this.venuePackageRepo.findOne({ where: { id: packageId } , relations : ['periods'] });
    
    const minPeriodPrice = venuePackage.periods.reduce((min, period) => {
      return period.package_price < min ? period.package_price : min;
    }, Number.POSITIVE_INFINITY);


    const totalPrice = totalServicePrice + totalEquipmentPrice + +minPeriodPrice;


    await this.venuePackageRepo.update(packageId, { package_price: totalPrice });
  }
}

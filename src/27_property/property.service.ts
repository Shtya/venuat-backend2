import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'entity/property/property.entity';
import { City } from 'entity/property/city.entity';
import { User } from 'entity/user/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'common/base/base.service';

@Injectable()
export class PropertyService extends BaseService<Property> {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {
    super(propertyRepository);
  }

  async findOneWithVenues(id: number): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['venue'],
    });

    if (!property) {
      throw new NotFoundException(this.i18n.t("events.property_not_found" , {args : {id}}));
    }

    return property;
  }


  async getAllByVendor(
    vendorId: number,
    query: {
      page: string;
      limit: string;
      sortBy: string;
      sortOrder: 'ASC' | 'DESC';
    },
  ){
    // Parse query parameters to numbers, fallback to defaults if invalid
    const page = isNaN(Number(query.page)) ? 1 : Math.max(1, Number(query.page));
    const limit = isNaN(Number(query.limit)) ? 10 : Math.max(1, Number(query.limit));

    const { sortBy = 'id', sortOrder = 'DESC' } = query;

    const [data, total] = await this.propertyRepository.findAndCount({
      where: {
        vendor: {
          id: vendorId
        },
      },
      relations: ['vendor'],
      order: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }
}

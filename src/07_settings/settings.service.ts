import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateHomeSettingsDto, CreateFaqDto, UpdateFaqDto, CreateSocialMediaDto, UpdateSocialMediaDto, CreateHomeSettingsDto } from 'dto/website/websiteSetting.dto';
import { HomeSettings } from 'entity/website/website_settings.entity';
import { v4 as uuidv4 } from 'uuid';
import { Venue } from 'entity/venue/venue.entity';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class HomeSettingsService {
  constructor(
    @InjectRepository(HomeSettings) private readonly homeSettingsRepo: Repository<HomeSettings>,
    @InjectRepository(Venue) private readonly venueRepo: Repository<Venue>
  ) {}

  async uploadOrUpdateContractPdf(files: { file_ar?: Express.Multer.File[]; file_en?: Express.Multer.File[] }) {
    let settings = await this.homeSettingsRepo.findOne({ where: { id: 1 } });

    if (!settings) {
      settings = this.homeSettingsRepo.create({
        id: 1,
        titleHome: { ar: null, en: null },
        secondTitleHome: { ar: null, en: null },
        urlVideo: null,
        specialVenues: [],
        bestRatedVenues: [],
        faqs: [],
        policies: [],
        termsAndCondition: { ar: null, en: null },
        socialMedia: [],
        dataPrivacy: { ar: null, en: null },
        necessaryLaws: { ar: null, en: null },
        contractPdfUrl: null,
        contractPdfUrl_en: null,
      });
      settings = await this.homeSettingsRepo.save(settings);
    }

    if (!files || (!files.file_ar && !files.file_en)) {
      throw new BadRequestException('No file(s) uploaded. Provide at least one of file_ar or file_en.');
    }

    if (files.file_ar && files.file_ar[0]) {
      settings.contractPdfUrl = `uploads/${files.file_ar[0].filename}`;
    }

    if (files.file_en && files.file_en[0]) {
      settings.contractPdfUrl_en = `uploads/${files.file_en[0].filename}`;
    }

    await this.homeSettingsRepo.save(settings);

    return {
      contractPdfUrl: settings.contractPdfUrl,
      contractPdfUrl_en: settings.contractPdfUrl_en,
    };
  }

  async getSettings() {
    let settings = await this.homeSettingsRepo.findOne({ where: { id: 1 } });

    if (!settings) {
      settings = this.homeSettingsRepo.create({
        id: 1,
        titleHome: { ar: null, en: null },
        secondTitleHome: { ar: null, en: null },
        urlVideo: null,
        specialVenues: [],
        bestRatedVenues: [],
        faqs: [],
        policies: [],
        termsAndCondition: { ar: null, en: null },
        socialMedia: [],
        dataPrivacy: { ar: null, en: null },
        necessaryLaws: { ar: null, en: null },
      });

      settings = await this.homeSettingsRepo.save(settings);
    }

    const specialVenues = settings.specialVenues?.length ? await this.venueRepo.find({ where: { id: In(settings.specialVenues) }, relations: ['ratings', 'occasion', 'venueGalleries', 'property', 'property.city', 'property.city.country'] }) : [];
    const bestRatedVenues = settings.bestRatedVenues?.length ? await this.venueRepo.find({ where: { id: In(settings.bestRatedVenues) }, relations: ['ratings', 'occasion', 'venueGalleries', 'property', 'property.city', 'property.city.country'] }) : [];

    return {
      settings,
      specialVenues,
      bestRatedVenues,
    };
  }

  async createOrUpdate(dto: CreateHomeSettingsDto) {
    let settings = await this.homeSettingsRepo.findOne({ where: { id: 1 } });

    if (!settings) {
      settings = this.homeSettingsRepo.create({
        id: 1,
        titleHome: { ar: null, en: null },
        secondTitleHome: { ar: null, en: null },
        urlVideo: null,
        specialVenues: [],
        bestRatedVenues: [],
        faqs: [],
        policies: [],
        termsAndCondition: { ar: null, en: null },
        socialMedia: [],
        dataPrivacy: { ar: null, en: null },
        necessaryLaws: { ar: null, en: null },
      });
      settings = await this.homeSettingsRepo.save(settings);
    }

    if (dto.faqs) {
      dto.faqs = dto.faqs.map(faq => ({
        id: faq.id || uuidv4(),
        ...faq,
      }));
    }

    if (dto.specialVenues?.length) {
      const foundVenues = await this.venueRepo.findBy({ id: In(dto.specialVenues) });
      const foundVenueIds = new Set(foundVenues.map(venue => venue.id));
      const invalidSpecialVenues = dto.specialVenues.filter(id => !foundVenueIds.has(id));

      if (invalidSpecialVenues.length > 0) {
        throw new BadRequestException(`Invalid special venue IDs: ${invalidSpecialVenues.join(', ')}`);
      }

      dto.specialVenues = Array.from(foundVenueIds);
    }

    if (dto.bestRatedVenues?.length) {
      const foundVenues = await this.venueRepo.findBy({ id: In(dto.bestRatedVenues) });
      const foundVenueIds = new Set(foundVenues.map(venue => venue.id));
      const invalidBestRatedVenues = dto.bestRatedVenues.filter(id => !foundVenueIds.has(id));

      if (invalidBestRatedVenues.length > 0) {
        throw new BadRequestException(`Invalid best-rated venue IDs: ${invalidBestRatedVenues.join(', ')}`);
      }

      dto.bestRatedVenues = Array.from(foundVenueIds);
    }

    Object.assign(settings, dto);
    return this.homeSettingsRepo.save(settings);
  }

  async addFaq(dto: CreateFaqDto | CreateFaqDto[]) {
    const { settings } = await this.getSettings();

    if (!Array.isArray(settings.faqs)) {
      settings.faqs = [];
    }

    const faqsArray = Array.isArray(dto) ? dto : [dto];

    const newFaqs = faqsArray.map(faq => ({
      id: uuidv4(),
      ...faq,
    }));

    settings.faqs.push(...newFaqs);
    return this.homeSettingsRepo.save(settings);
  }

  async removeFaq(id: string): Promise<HomeSettings> {
    const { settings } = await this.getSettings();

    const faqIndex = settings.faqs.findIndex(faq => faq.id === id);
    if (faqIndex === -1) {
      throw new NotFoundException('FAQ not found');
    }

    settings.faqs.splice(faqIndex, 1);
    return this.homeSettingsRepo.save(settings);
  }

  async addPolicies(dto) {
    const { settings } = await this.getSettings();

    if (!Array.isArray(settings.policies)) {
      settings.policies = [];
    }

    const policiesArray = Array.isArray(dto) ? dto : [dto];

    const newPolicies = policiesArray.map(policy => ({
      id: uuidv4(),
      ...policy,
    }));

    settings.policies.push(...newPolicies);
    return this.homeSettingsRepo.save(settings);
  }

  async removePolicies(id: string): Promise<HomeSettings> {
    const { settings } = await this.getSettings();

    const PoliciesIndex = settings.policies.findIndex(Policies => Policies.id === id);
    if (PoliciesIndex === -1) {
      throw new NotFoundException('Policies not found');
    }

    settings.policies.splice(PoliciesIndex, 1);
    return this.homeSettingsRepo.save(settings);
  }
}

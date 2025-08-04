import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UpdateHomeSettingsDto, CreateFaqDto, UpdateFaqDto, CreateSocialMediaDto, UpdateSocialMediaDto, CreateHomeSettingsDto } from 'dto/website/websiteSetting.dto';
import { HomeSettingsService } from './settings.service';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, multerOptionsPdf } from 'common/multer/multer.config';

@Controller('settings')
export class HomeSettingsController {
  constructor(private readonly homeSettingsService: HomeSettingsService) {}

  @Post('contract-pdf')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_UPDATE)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file_ar', maxCount: 1 },
        { name: 'file_en', maxCount: 1 },
      ],
      multerOptionsPdf
    )
  )
  uploadOrUpdateContractPdf(
    @UploadedFiles()
    files: {
      file_ar?: Express.Multer.File[];
      file_en?: Express.Multer.File[];
    }
  ) {
    return this.homeSettingsService.uploadOrUpdateContractPdf(files);
  }

  @Get()
  getSettings() {
    return this.homeSettingsService.getSettings();
  }

  @Put()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_UPDATE)
  updateSettings(@Body() dto: UpdateHomeSettingsDto) {
    return this.homeSettingsService.createOrUpdate(dto);
  }

  @Post('faq')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_CREATE)
  addFaq(@Body() dto: CreateFaqDto) {
    return this.homeSettingsService.addFaq(dto);
  }

  @Delete('faq/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_DELETE)
  removeFaq(@Param('id') id: string) {
    return this.homeSettingsService.removeFaq(id);
  }

  @Post('policy')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_CREATE)
  addPolicies(@Body() dto) {
    return this.homeSettingsService.addPolicies(dto);
  }

  @Delete('policy/:id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.WEBSITE_SETTINGS_DELETE)
  removePolicies(@Param('id') id: string) {
    return this.homeSettingsService.removePolicies(id);
  }
}

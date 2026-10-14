import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountRequest } from './dto/create-account.request';
import { UpdateAccountRequest } from './dto/update-account.request';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.accountsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Post()
  async create(@Body() request: CreateAccountRequest) {
    return this.accountsService.create(request);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateAccountRequest) {
    return this.accountsService.update(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}

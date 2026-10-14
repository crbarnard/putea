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
import { TransactionsService } from './transactions.service';
import { CreateTransactionRequest } from './dto/create-transaction.request';
import { UpdateTransactionRequest } from './dto/update-transaction.request';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  async findAll(
    @Query('userId') userId?: string,
    @Query('accountId') accountId?: string,
  ) {
    return this.transactionsService.findAll({ userId, accountId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Post()
  async create(@Body() request: CreateTransactionRequest) {
    return this.transactionsService.create(request);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() request: UpdateTransactionRequest,
  ) {
    return this.transactionsService.update(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}

import { NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

const transaction = { id: 't1', userId: 'u1', accountId: 'a1', amount: '10.00' };

function createService(db: object) {
  return new TransactionsService({ db } as never);
}

describe('TransactionsService', () => {
  it('findAll returns transactions', async () => {
    const findMany = jest.fn().mockResolvedValue([transaction]);
    const service = createService({ query: { transactions: { findMany } } });

    await expect(service.findAll({ accountId: 'a1' })).resolves.toEqual([
      transaction,
    ]);
    expect(findMany).toHaveBeenCalled();
  });

  it('findOne throws when missing', async () => {
    const findFirst = jest.fn().mockResolvedValue(undefined);
    const service = createService({ query: { transactions: { findFirst } } });

    await expect(service.findOne('nope')).rejects.toThrow(NotFoundException);
  });

  it('create returns the inserted transaction', async () => {
    const returning = jest.fn().mockResolvedValue([transaction]);
    const values = jest.fn().mockReturnValue({ returning });
    const service = createService({
      insert: jest.fn().mockReturnValue({ values }),
    });

    await expect(
      service.create({
        userId: 'u1',
        accountId: 'a1',
        type: 'expense',
        amount: '10.00',
        date: '2026-01-01',
      }),
    ).resolves.toEqual(transaction);
  });

  it('update throws when missing', async () => {
    const returning = jest.fn().mockResolvedValue([]);
    const where = jest.fn().mockReturnValue({ returning });
    const set = jest.fn().mockReturnValue({ where });
    const service = createService({
      update: jest.fn().mockReturnValue({ set }),
    });

    await expect(service.update('nope', { notes: 'x' })).rejects.toThrow(
      NotFoundException,
    );
  });
});

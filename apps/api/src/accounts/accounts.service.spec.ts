import { NotFoundException } from '@nestjs/common';
import { AccountsService } from './accounts.service';

const account = { id: 'a1', userId: 'u1', name: 'Everyday' };

function createService(db: object) {
  return new AccountsService({ db } as never);
}

describe('AccountsService', () => {
  it('findAll returns accounts', async () => {
    const findMany = jest.fn().mockResolvedValue([account]);
    const service = createService({ query: { accounts: { findMany } } });

    await expect(service.findAll('u1')).resolves.toEqual([account]);
    expect(findMany).toHaveBeenCalled();
  });

  it('findOne returns the account', async () => {
    const findFirst = jest.fn().mockResolvedValue(account);
    const service = createService({ query: { accounts: { findFirst } } });

    await expect(service.findOne('a1')).resolves.toEqual(account);
  });

  it('findOne throws when missing', async () => {
    const findFirst = jest.fn().mockResolvedValue(undefined);
    const service = createService({ query: { accounts: { findFirst } } });

    await expect(service.findOne('nope')).rejects.toThrow(NotFoundException);
  });

  it('create returns the inserted account', async () => {
    const returning = jest.fn().mockResolvedValue([account]);
    const values = jest.fn().mockReturnValue({ returning });
    const service = createService({
      insert: jest.fn().mockReturnValue({ values }),
    });

    await expect(
      service.create({ userId: 'u1', name: 'Everyday', type: 'checking' }),
    ).resolves.toEqual(account);
  });

  it('remove throws when missing', async () => {
    const returning = jest.fn().mockResolvedValue([]);
    const where = jest.fn().mockReturnValue({ returning });
    const service = createService({
      delete: jest.fn().mockReturnValue({ where }),
    });

    await expect(service.remove('nope')).rejects.toThrow(NotFoundException);
  });
});

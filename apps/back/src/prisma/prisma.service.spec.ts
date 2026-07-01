import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    service = new PrismaService();
    expect(service).toBeDefined();
    service.$disconnect().catch(() => {});
  });

  describe('onModuleInit', () => {
    it('should call $connect when shouldConnect is true', async () => {
      service = new PrismaService();
      service['shouldConnect'] = true;
      const connectSpy = jest
        .spyOn(service, '$connect')
        .mockResolvedValue(undefined);

      await service.onModuleInit();
      expect(connectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call $connect when shouldConnect is false', async () => {
      service = new PrismaService();
      service['shouldConnect'] = false;
      const connectSpy = jest.spyOn(service, '$connect');

      await service.onModuleInit();
      expect(connectSpy).not.toHaveBeenCalled();
    });
  });

  describe('onModuleDestroy', () => {
    it('should call $disconnect when shouldConnect is true', async () => {
      service = new PrismaService();
      service['shouldConnect'] = true;
      const disconnectSpy = jest
        .spyOn(service, '$disconnect')
        .mockResolvedValue(undefined);

      await service.onModuleDestroy();
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call $disconnect when shouldConnect is false', async () => {
      service = new PrismaService();
      service['shouldConnect'] = false;
      const disconnectSpy = jest.spyOn(service, '$disconnect');

      await service.onModuleDestroy();
      expect(disconnectSpy).not.toHaveBeenCalled();
    });
  });

  describe('enableShutdownHooks', () => {
    it('should register beforeExit handler on process', () => {
      service = new PrismaService();
      const onSpy = jest.spyOn(process, 'on').mockImplementation(() => process);
      const mockApp = { close: jest.fn() } as any;

      service.enableShutdownHooks(mockApp);
      expect(onSpy).toHaveBeenCalledWith('beforeExit', expect.any(Function));
      onSpy.mockRestore();
    });
  });
});

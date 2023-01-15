import { Work } from '../models/tasks/work.entity';
import { WorkRepository } from '../repositories/work.repository';
import { WorkController } from '../controllers/work.controller';
import { WorkService } from '../services/work.service';
  
describe('WorkController', () => {
  let workController: WorkController;
  let workService: WorkService;

  beforeEach(() => {
    workService = new WorkService(new WorkRepository());
    workController = new WorkController(workService);
  });
//".*\\.spec\\.ts$",
  describe('getTaskById', () => {
    it('should return an array of cats', async () => {
      const result = new Work();
      jest.spyOn(workService, 'getTaskById').mockImplementation(async () =>  await result);

      expect(await workController.getTaskById('1')).toBe(result);
    });
  });
});
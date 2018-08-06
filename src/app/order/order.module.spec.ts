import { OrderModule } from './order.module';

describe('OrderModule', () => {
  let shoppingModule: OrderModule;

  beforeEach(() => {
    shoppingModule = new OrderModule();
  });

  it('should create an instance', () => {
    expect(shoppingModule).toBeTruthy();
  });
});

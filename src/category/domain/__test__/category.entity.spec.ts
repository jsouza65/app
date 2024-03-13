import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  })
  describe('constructor', () => {
    //Arrange Act Assert
    test('should create a category with default properties', () => {
      let category = new Category({
        name: 'Movie'
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(0);
    });

    test('should create a category with all properties', () => {
      const created_at = new Date();
      const category = new Category({
        name: 'Movie',
        description: 'Movies category',
        is_active: false,
        created_at
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
      expect(validateSpy).toHaveBeenCalledTimes(0);
    });

    test('should create a category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movies category'
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("create command", () => {
    test('should create a category with default properties', () => {
      let category = Category.create({
        name: 'Movie'
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with all properties', () => {
      const created_at = new Date();
      const category = Category.create({
        name: 'Movie',
        description: 'Movies category',
        is_active: false
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with name and description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movies category'
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('category_id field', () => {
    const arrange = [
      { id: null }, { id: undefined }, { id: new Uuid() }
    ];
    test.each(arrange)('id = %j', ({ id }) => {
      const category = new Category({
        name: "Movie",
        category_id: id as any
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
    });
  });

  describe('other methods', () => {
    const category = new Category({
      name: 'Movie'
    });

    test('should change category name', () => {
      category.changeName('Film');
      expect(category.name).toBe('Film');
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    
    test('should change category description', () => {
      const category = Category.create({
        name: 'Movie'
      });
      category.changeDescription('Movies category');
      expect(category.description).toBe('Movies category');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should deactivate category', () => {
      category.deactivate();
      expect(category.is_active).toBeFalsy();
    });
      
    test('should activate category', () => {
      category.activate();
      expect(category.is_active).toBeTruthy();
    });
  });

})

describe("Category Validator", () => {
  describe('create command', () => {
    test('should an invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorsMessages({
        name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
      });

      expect(() => Category.create({ name: '' })).containsErrorsMessages({
        name: ['name should not be empty']
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorsMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
      });

      expect(() => Category.create({ name: 'x'.repeat(256) })).containsErrorsMessages({
        name: ['name must be shorter than or equal to 255 characters']
      });
    });

    test('should a invalid category using description property', () => {
      expect(() => Category.create({ name: 'Movie', description: 5 as any })).containsErrorsMessages({
        description: ['description must be a string', 'description must be shorter than or equal to 255 characters']
      });
    });

    test('should a invalid category using is_active property', () => {
      expect(() => Category.create({ name: 'Movie', is_active: 5 as any })).containsErrorsMessages({
        is_active: ['is_active must be a boolean value']
      });
    });
  });

  describe('change name method', () => {
    test('sould a invalid change name category porperty', () => {
      const category = Category.create({ name: 'Movie' });
      expect(() => category.changeName(null)).containsErrorsMessages({
        name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
      });
      expect(() => category.changeName('')).containsErrorsMessages({
        name: ['name should not be empty']
      });
      expect(() => category.changeName(5 as any)).containsErrorsMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
      });
      expect(() => category.changeName('x'.repeat(256))).containsErrorsMessages({
        name: ['name must be shorter than or equal to 255 characters']
      });
    });
  });

  describe('change description method', () => {
    test('sould a invalid change description category porperty', () => {
      const category = Category.create({ name: 'Movie' });
      expect(() => category.changeDescription(5 as any)).containsErrorsMessages({
        description: ['description must be a string', 'description must be shorter than or equal to 255 characters']
      });
      expect(() => category.changeDescription('x'.repeat(256))).containsErrorsMessages({
        description: ['description must be shorter than or equal to 255 characters']
      });
    });
  });
});

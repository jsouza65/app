import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    //Arrange Act Assert
    test('should create a category with default properties', () => {
      //@ts-expect-error
      let category = new Category({
        name: 'Movie'
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with all properties', () => {
      const created_at = new Date();
      //@ts-expect-error
      const category = new Category({
        name: 'Movie',
        description: 'Movies category',
        is_active: false,
        created_at
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });

    test('should create a category with name and description', () => {
      //@ts-expect-error
      const category = new Category({
        name: 'Movie',
        description: 'Movies category'
      });
      expect(category.category_id).toBeUndefined();
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
      expect(typeof category.category_id).toBe('string');
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a category with all properties', () => {
      const created_at = new Date();
      const category = Category.create({
        name: 'Movie',
        description: 'Movies category',
        is_active: false
      });
      expect(typeof category.category_id).toBe('string');
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
      expect(typeof category.category_id).toBe('string');
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movies category');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('other methods', () => {
    const category = new Category({
      category_id: 'id',
      name: 'Movie'
    });

    test('should change category name', () => {
      category.changeName('Film');
      expect(category.name).toBe('Film');
    });
    
    test('should change category description', () => {
      category.changeDescription('Movies category');
      expect(category.description).toBe('Movies category');
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
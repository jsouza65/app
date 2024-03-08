export type CategoryConstructorProps = {
  category_id: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export class Category {
  category_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id;
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: CategoryCreateCommand): Category {
    const category_id = 'ID';
    return new Category({ category_id, ...props });
  }

  changeName(newName: string): void {
    this.name = newName;
  }

  changeDescription(newDescription: string | null): void {
    this.description = newDescription;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  toJSON(): CategoryConstructorProps{
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
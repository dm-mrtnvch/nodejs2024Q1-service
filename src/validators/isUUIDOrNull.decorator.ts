import { registerDecorator, ValidationOptions, ValidationArguments, isUUID } from 'class-validator';

export const IsUUIDOrNull = (validationOptions?: ValidationOptions) => {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUUIDOrNull',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === null) {
            return true;
          }
          
          return isUUID(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid UUID or null`;
        }
      }
    });
  };
}

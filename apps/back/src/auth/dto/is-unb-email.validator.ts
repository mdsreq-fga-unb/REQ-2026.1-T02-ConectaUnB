import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Cargo } from '@prisma/client';

@ValidatorConstraint({ name: 'isUnbEmail', async: false })
export class IsUnbEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {

    const { cargo } = args.object as any;

    if (!email || typeof email !== 'string') return false;

    // Para o cargo Docente
    if (cargo === Cargo.DOCENTE) {
      return email.trim().endsWith('@unb.br');
    }

    // Para o cargo Discente
    if (cargo === Cargo.DISCENTE) {
      return email.trim().endsWith('@aluno.unb.br');
    }

    return false;
  }

  // Mensagem de erro
  defaultMessage(args: ValidationArguments) {
    const { cargo } = args.object as any;
    
    if (cargo === Cargo.DOCENTE) {
      return 'O e-mail de docente deve obrigatoriamente terminar com @unb.br';
    }
    if (cargo === Cargo.DISCENTE) {
      return 'O e-mail de discente deve obrigatoriamente terminar com @aluno.unb.br';
    }
    
    return 'E-mail inválido para o cargo selecionado.';
  }
}

export function IsUnbEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUnbEmailConstraint,
    });
  };
}
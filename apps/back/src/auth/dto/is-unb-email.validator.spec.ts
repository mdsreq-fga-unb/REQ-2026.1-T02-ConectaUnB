import { IsUnbEmailConstraint } from './is-unb-email.validator';
import { Cargo } from '@prisma/client';
import { ValidationArguments } from 'class-validator';

describe('IsUnbEmailConstraint', () => {
  let constraint: IsUnbEmailConstraint;

  beforeEach(() => {
    constraint = new IsUnbEmailConstraint();
  });

  const makeArgs = (cargo: Cargo): ValidationArguments => ({
    value: '',
    constraints: [],
    targetName: '',
    object: { cargo },
    property: 'email',
  });

  describe('validate', () => {
    it('should accept docente email ending with @unb.br', () => {
      expect(
        constraint.validate('professor@unb.br', makeArgs(Cargo.DOCENTE)),
      ).toBe(true);
    });

    it('should reject docente email ending with @aluno.unb.br', () => {
      expect(
        constraint.validate('professor@aluno.unb.br', makeArgs(Cargo.DOCENTE)),
      ).toBe(false);
    });

    it('should accept discente email ending with @aluno.unb.br', () => {
      expect(
        constraint.validate('student@aluno.unb.br', makeArgs(Cargo.DISCENTE)),
      ).toBe(true);
    });

    it('should reject discente email ending with @unb.br', () => {
      expect(
        constraint.validate('student@unb.br', makeArgs(Cargo.DISCENTE)),
      ).toBe(false);
    });

    it('should reject email with external domain', () => {
      expect(
        constraint.validate('user@gmail.com', makeArgs(Cargo.DISCENTE)),
      ).toBe(false);
    });

    it('should reject null email', () => {
      expect(constraint.validate(null as any, makeArgs(Cargo.DISCENTE))).toBe(
        false,
      );
    });

    it('should reject undefined email', () => {
      expect(
        constraint.validate(undefined as any, makeArgs(Cargo.DISCENTE)),
      ).toBe(false);
    });

    it('should reject empty string email', () => {
      expect(constraint.validate('', makeArgs(Cargo.DISCENTE))).toBe(false);
    });

    it('should accept email with leading/trailing whitespace for docente', () => {
      expect(
        constraint.validate('  professor@unb.br  ', makeArgs(Cargo.DOCENTE)),
      ).toBe(true);
    });
  });

  describe('defaultMessage', () => {
    it('should return docente error message for DOCENTE cargo', () => {
      const msg = constraint.defaultMessage(makeArgs(Cargo.DOCENTE));
      expect(msg).toContain('@unb.br');
    });

    it('should return discente error message for DISCENTE cargo', () => {
      const msg = constraint.defaultMessage(makeArgs(Cargo.DISCENTE));
      expect(msg).toContain('@aluno.unb.br');
    });
  });
});

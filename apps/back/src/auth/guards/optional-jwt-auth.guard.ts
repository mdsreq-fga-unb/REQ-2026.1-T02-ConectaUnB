import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Versao "opcional" do JwtAuthGuard: se o token estiver presente e valido,
 * popula req.user. Se ausente ou invalido, segue sem bloquear (req.user
 * ficara indefinido). Util para endpoints publicos que personalizam a
 * resposta quando o usuario esta autenticado (ex.: contagem de curtidas).
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers?.authorization ?? req.headers?.Authorization;
    if (!authHeader) {
      return true;
    }
    try {
      await super.canActivate(context);
    } catch {
      return true;
    }
    return true;
  }

  handleRequest<T = any>(err: unknown, user: any): T {
    return user as T;
  }
}

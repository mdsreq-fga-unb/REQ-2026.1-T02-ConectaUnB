import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api/docs', 302)
  @ApiOperation({ summary: 'Redirect to API docs' })
  @ApiResponse({ status: 302, description: 'Redirect to Swagger docs.' })
  root() {}
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy.' })
  getHealth() {
    return { status: 'ok' };
  }
}

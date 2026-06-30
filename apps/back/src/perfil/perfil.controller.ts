import { Controller, Get, Body, Patch, Param, Delete, Post, ParseIntPipe } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get('seguindo/:id')
  findSeguindo(@Param('id', ParseIntPipe) id: number) {
    return this.perfilService.findSeguindo(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perfilService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() updatePerfilDto: UpdatePerfilDto) {
    const id = Number(req.user.id);
    return this.perfilService.update(id, updatePerfilDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req) {
    const id = Number(req.user.id);
    return this.perfilService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('seguir/:id')
  seguir(
    @Param('id') id: string,
    @Request() req
  ) {
    const idUsuario = Number(req.user.id);
    return this.perfilService.seguir(Number(id), idUsuario);
  }
}

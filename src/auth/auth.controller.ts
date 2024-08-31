import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authenticateDTO } from './dto/authenticate.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(@Body() body: authenticateDTO) {
    return this.authService.signIn(body);
  }

  @Post('/refresh')
  async refresh(@Body() body: any) {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @Get()
  async getAll() {
    return this.authService.getAll();
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Nehal_Is_a_clever_student', // should be in env_varaible
      ignoreExpiration: false,
    });
  }
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}

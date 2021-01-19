import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import { promisify } from 'util';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  logger: Logger;
  cert: string;

  jwks = jwks({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-nynqy0sn.us.auth0.com/.well-known/jwks.json',
  });

  constructor() {
    this.logger = new Logger(JwtAuthGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug(':canActivate');
    const client: Socket = context.switchToWs().getClient<Socket>();
    const authToken: string = client.handshake.query['token'];
    const getKey = promisify(this.jwks.getSigningKeyAsync);
    try {
      const key = await getKey(this.getKid(authToken));
      const signingKey = (key['publicKey'] as string) || (key['rsaPublicKey'] as string);
      const jwtPayload = jwt.verify(authToken, signingKey, { algorithms: ['RS256'] });
      console.log(':canActivate jwtPayload=', jwtPayload, ' returning true');
      return Boolean(jwtPayload);
    } catch (err) {
      console.log('canActivate catch block with err=', err);
      throw new WsException(err.message);
    }
  }

  getKid(token: string): string {
    const decoded: any = jwt.decode(token, { complete: true });
    this.logger.debug(`:getKid returning kid:${JSON.stringify(decoded.header['kid'])}`);
    return decoded.header['kid'];
  }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenService } from "./authen.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authenService: AuthenService){
        super();
    }

    async validate(email: string, password: string): Promise<any>{
        const user = await this.authenService.validateUser(email,password);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}
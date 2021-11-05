import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenService {
    constructor(private userService: UserService){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if(user && user.password == password){
            const {email, password, ...rest} = user;
            return rest;
        }

        return null;
    }
}

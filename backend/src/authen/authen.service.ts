import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenService {
    constructor(private userService: UserService){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        if(user && user.password == password){
            const {username, password, ...rest} = user;
            return rest;
        }

        return null;
    }
}

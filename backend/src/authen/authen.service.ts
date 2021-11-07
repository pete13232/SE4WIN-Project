import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenService {
    constructor(private userService: UserService){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        // const hashPassword = await bcrypt.hash(password, 10);
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if(user && passwordMatch){
            const {email, password, ...rest} = user;
            return rest;
        }

        return null;
    }
}

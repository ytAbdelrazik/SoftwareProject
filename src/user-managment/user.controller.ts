import { Body, Controller, Post } from '@nestjs/common';
import{UserService} from 'src/user-managment/user-service';
import { CreateUserdto } from './dots/CreateUser.dto';
@Controller('user')
export class UserController {


constructor(private userservice:UserService){}
 @Post()
 CreateUser( @Body() CreateUserdto:CreateUserdto){
   



 }

}

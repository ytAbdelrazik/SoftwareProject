import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/users.module";

@Module({
  imports: [
  MongooseModule.forRoot('mongodb+srv://yt:yt123@cluster0.l8ikh.mongodb.net/users'), 
  UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
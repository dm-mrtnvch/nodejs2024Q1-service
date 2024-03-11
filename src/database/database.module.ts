import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { db } from "./database";



@Module({
  providers: [DatabaseService, db],
  exports: [DatabaseService, db],
})

export class DatabaseModule{};

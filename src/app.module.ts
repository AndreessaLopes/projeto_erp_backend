import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { SalesModule } from "./modules/sales/sales.module";
import { StoresModule } from "./modules/stores/stores.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { CommomModule } from "./common/common.module";
import { CoreModule } from "./core/core.module";
import { ConfigModule } from "./config/config.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { RolesModule } from "./modules/roles/roles.module";
import { RoleSeeder } from "./common/seeders/roles.seeder";
import { UserSeeder } from "./common/seeders/user.seeder";
import { SeedersModule } from "./common/seeders/seeders.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    SalesModule,
    StoresModule,
    ReportsModule,
    AnalyticsModule,
    CommomModule,
    CoreModule,
    ConfigModule,
    InfrastructureModule,
    DatabaseModule,
    SeedersModule, // 👈 agora sim, em um contexto ÚNICO
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

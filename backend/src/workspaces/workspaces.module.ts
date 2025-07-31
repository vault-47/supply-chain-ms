import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { QuoteRequestsService } from 'src/request-quotes/quote-requests.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { WorkspacesService } from './workspaces.service';

@Module({
  providers: [
    WorkspacesService,
    QuoteRequestsService,
    AuthService,
    UsersService,
    PaginationService,
  ],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}

import { IsNumberString, IsOptional, Min } from 'class-validator';
export class PaginationParam {

    @IsOptional()
    @IsNumberString()
    rowsPerPage: string;

    @IsOptional()
    @IsNumberString()
    page: string;
  }
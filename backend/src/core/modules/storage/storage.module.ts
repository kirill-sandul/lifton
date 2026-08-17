import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { supabaseProvider } from 'src/core/supabase/supabase.provider';

@Module({
  providers: [StorageService, supabaseProvider],
  exports: [StorageService],
})
export class StorageModule {}

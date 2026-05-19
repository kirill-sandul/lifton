import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private supabase: SupabaseClient
  ) {}

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const fileName = `${folder}/${crypto.randomUUID()}.${file.originalname.split('.').pop()}`;

    const { error } = await this.supabase.storage
      .from('lifton')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      })

    if(error) throw new Error(error.message);

    const { data } = this.supabase.storage
      .from('lifton')
      .getPublicUrl(fileName)

    return data.publicUrl;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  public baseUrl = 'https://kriya-backendapi-dev.redblacktree.net/api/v1';

  // for local
  // public baseUrl = 'http://localhost:4000/api/v1';

  public version = 'V 0.0.1';
  public buildNumber = '1';
}

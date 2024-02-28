import { container, injectable } from "tsyringe";
import { LogggingService } from "./loggingService";
import { LanguageService } from "./languageService";
import { StorageService } from "./../../framework/services/storageService";
import { ObjectHelper } from "../common/functions/objectHelper";
import { StorageKey } from "../common/constants/storageKey";
import { AuthObject } from "../types/authType";

export class SystemError {
  public code = 0;
  public message = "";
}

@injectable()
export class BaseService {
  protected readonly languageService: LanguageService = container.resolve(LanguageService);
  protected readonly loggingService: LogggingService = container.resolve(LogggingService);
  protected readonly storageService: StorageService = container.resolve(StorageService);

  protected getHeader(needAuthentication = false, accept = "application/json", contentType = "application/json"): Headers {
    const headers = new Headers();
    if (accept) {
      headers.append("Accept", accept);
    }
    if (contentType) {
      headers.append("Content-Type", contentType);
    }
    if (needAuthentication) {
      const authObject = ObjectHelper.getCookie(StorageKey.authObject);
      if (authObject) {
        const accessToken = (JSON.parse(authObject) as AuthObject).accessToken;
        headers.append("Authorization", "Bearer " + accessToken);
      }
    }
    return headers;
  }
}

import "reflect-metadata";
import { singleton } from "tsyringe";
import { BaseService } from "./baseService";
import { StorageKey } from "../common/constants/storageKey";
import { ObjectHelper } from "../common/functions/objectHelper";
import { AuthProfileObject } from '../types/authType';

@singleton()
export class AuthService extends BaseService {
  private readonly urlRequest = {
  };

  /**
   * Check authentication
   * @returns
   */
  public isAuthenticated(): boolean {
    const me = this;
    try {
      const authObject = ObjectHelper.getCookie(StorageKey.authObject);
      if (authObject) {
        return true;
      }
    } catch (ex) {
      me.loggingService.logError(ex);
    }
    return false;
  }

  /**
   * Get user infromation at local
   * @returns
   */
  public getUserInformationLocal(): AuthProfileObject | undefined {
    const me = this;
    const authObject = me.storageService.getObject<AuthProfileObject>(
      StorageKey.authObjectProfile
    );
    return authObject;
  }

  /**
   * Logout
   * @returns
   */
  public async logout(): Promise<boolean> {
    const me = this;
    try {
      document.cookie = StorageKey.authObject + "=;domain=" + window.location.hostname + ";path=/;SameSite=Lax";
      me.storageService.clear();
      return true;
    } catch (ex) {
      me.loggingService.logError(ex);
    }
    return false;
  }
}

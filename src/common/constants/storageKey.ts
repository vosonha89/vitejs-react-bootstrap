import { StorageKey as FWStorageKey } from '../../../framework/constants/storageKey';

/**
 * For store local storage/ session storage/ cookies  key
 */
export class StorageKey extends FWStorageKey {
    public static authObject = 'ref_auth';
    public static authObjectProfile = 'ref_auth_profile';
}
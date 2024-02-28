import "reflect-metadata";
import { container, singleton } from "tsyringe";
import en from "../../public/language/en.json";
import vi from "../../public/language/vi.json";
import { LanguageCode } from "../../framework/constants/languageCode";
import { StorageKey } from "../../framework/constants/storageKey";
import { LanguageText } from "../types/languageText";
import { StorageService } from "../../framework/services/storageService";

@singleton()
export class LanguageService {
  public readonly storeService = container.resolve(StorageService);
  public text!: LanguageText;

  constructor() {
    let currentLanguage = this.storeService.getObject<string>(
      StorageKey.language
    );
    if (!currentLanguage) {
      currentLanguage = LanguageCode.VI;
    }
    this.getLanguageText(currentLanguage);
  }

  /** Set language to store */
  public setLanguage(value: string) {
    const me = this;
    me.storeService.saveObject<string>(StorageKey.language, value);
    me.getLanguageText(value);
  }

  /** Get language text from json */
  public getLanguageText(value: string): void {
    const me = this;
    if (value == LanguageCode.EN) {
      me.text = en as unknown as LanguageText;
    } else {
      me.text = vi as unknown as LanguageText;
    }
  }

  public trans(
    key: string,
    options?: { [prop: string]: string | number | unknown }
  ) {
    if (!this?.text) {
        return key;
    }
    const textJson = JSON.parse(JSON.stringify(this.text));
    let split = key?.split(".").reduce((a, c) => a[c], textJson) as string || '';
    if (options) {
      Object.keys(options).forEach((k) => {
        split = split.replace(`{${k}}`, options[k] + "");
      });
    }
    return split || key;
  }
}

export interface LanguageText {
    appName: string;
    label: Label;
    menu: Menu;
    message: Message;
    errorMessage: ErrorMessage;
}

export interface ErrorMessage {
    internalServerError: string;
    requiredField: string;
    wrongEmailFormat: string;
}

export interface Label {
    hi: string;
    error: string;
    enter: string;
    warning: string;
    success: string;
    create: string;
    edit: string;
    delete: string;
    list: string;
    first: string;
    last: string;
    next: string;
    previous: string;
    show: string;
    records: string;
    pageOf: string;
    status: string;
    search: string;
    save: string;
    information: string;
    active: string;
    inactive: string;
    select: string;
    order: string;
    favorite: string;
    version: string;
    back: string;
    saveDraft: string;
    editName: string;
}

export interface Menu {
    home: string;
    course: string;
    pricing: string;
    guide: string;
    overview: string;
    profile: string;
}

export interface Message {
    saveSuccess: string;
    required: string;
    passNotMatch: string;
}

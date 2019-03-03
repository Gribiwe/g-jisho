import { IUser } from 'app/core/user/user.model';
import { IDictionary } from 'app/shared/model/dictionary.model';

export interface IKanjiRecord {
    id?: number;
    value?: string;
    hiragana?: string;
    katakana?: string;
    meaning?: string;
    note?: string;
    creator?: IUser;
    dictionaries?: IDictionary[];
}

export class KanjiRecord implements IKanjiRecord {
    constructor(
        public id?: number,
        public value?: string,
        public hiragana?: string,
        public katakana?: string,
        public meaning?: string,
        public note?: string,
        public creator?: IUser,
        public dictionaries?: IDictionary[]
    ) {}
}

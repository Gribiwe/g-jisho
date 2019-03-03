import { IUser } from 'app/core/user/user.model';
import { IKanjiRecord } from 'app/shared/model/kanji-record.model';

export interface IDictionary {
    id?: number;
    name?: string;
    creator?: IUser;
    users?: IUser[];
    kanjiRecords?: IKanjiRecord[];
}

export class Dictionary implements IDictionary {
    constructor(
        public id?: number,
        public name?: string,
        public creator?: IUser,
        public users?: IUser[],
        public kanjiRecords?: IKanjiRecord[]
    ) {}
}

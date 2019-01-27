import { Document } from 'mongoose';

import AccountRepositoryFactory from '../../../shared/repositories/account-repository/account-repository.factory';
import IAccountRepository from '../../../shared/repositories/account-repository/account-repository.interface';
import KeyRemover from '../../../shared/services/key-remover/key-remover';
import IKeyRemover from '../../../shared/services/key-remover/key-remover.interface';
import UserRepositoryFactory from '../../../shared/repositories/user-repository/user-repository.factory';
import IUserRepository from '../../../shared/repositories/user-repository/user-repository.interface';

export class UserService {

    private _accountRepository: IAccountRepository;
    private _userRepository: IUserRepository;
    private _remover: IKeyRemover;

    constructor(

        accountRepository: IAccountRepository,
        userRepository: IUserRepository,
        keyRemover: IKeyRemover

    ) {

        this._accountRepository = accountRepository;
        this._userRepository = userRepository;
        this._remover = keyRemover;
    }

    private toObject(document: Document): any {

        const object = document.toObject();
        const keys = ['_id', '__v'];

        return this._remover.remove([object], keys)[0];
    }

    private async hasAccount(id: number): Promise<boolean> {

        return this._accountRepository.has(id);
    }

    private async hasAssociatedUser(accountId: number): Promise<boolean> {

        const user = await this._userRepository.findByAccountId(accountId);

        return !!user;
    }

    private async isValidAccountId(id: number): Promise<boolean> {

        if (!await this.hasAccount(id)) {

            return false;
        }

        return !await this.hasAssociatedUser(id);
    }

    private async insertUser(accountId: number, data: any): Promise<any> {

        return this._userRepository.insertOne({

            account_id: accountId,
            name: data.name,
            view_histories: `${data.baseUrl}/histories`,
            bookmarks: `${data.baseUrl}/bookmarks`
        });
    }

    public async getUser(id: number): Promise<any> {

        const user = await this._userRepository.findById(id);

        return user ? this.toObject(user) : null;
    }

    public async hasUser(id: number): Promise<boolean> {

        return this._userRepository.has(id);
    }

    public async updateUser(id: number, data: any): Promise<any> {

        const result = await this._userRepository.updateOne(data, { id });

        return result ? this.toObject(result) : null;
    }

    public async createUser(accountId: number, data: any): Promise<any> {

        if (!await this.isValidAccountId(accountId)) {

            return null;
        }

        const result = await this.insertUser(accountId, data);

        return result ? this.toObject(result) : null;
    }
}

export default new UserService(

    new AccountRepositoryFactory().createRepository(),
    new UserRepositoryFactory().createRepository(),
    new KeyRemover()
);

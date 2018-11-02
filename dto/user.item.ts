import UserTypeItem from '../dto/user-type.item';
import UserWordItem from '../dto/user-word.item';
import UserPhraseItem from '../dto/user-phrase.item';
import * as mongoose from 'mongoose';
import * as config from 'config';
import * as Joi from 'joi';

export default class UserItem {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _type: string; //UserTypeItem id
  private _materials: string[];
  private _words: UserWordItem[];
  private _phrases: UserPhraseItem[];

  constructor(
    id: string, 
    name: string, 
    email: string, 
    password: string, 
    type: string, 
    materials: string[], 
    words: UserWordItem[], 
    phrases: UserPhraseItem[]
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._type = type;
    this._materials = materials;
    this._words = words;
    this._phrases = phrases;
  }

  public static get schema() {
    const { name, email } = config.get('validation.user');
    return new mongoose.Schema({
      name: {
        type: String,
        minlength: name.min,
        maxlength: name.max,
        required: true
      },
      email: {
        type: String,
        match: email.regexp
      },
      type: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      materials: {
        type: [mongoose.Types.ObjectId],
      },
      words: {
        type: [UserWordItem],
      },
      phrases: {
        type: [UserPhraseItem]
      }
    })
  }

  public get model(): mongoose.Model<any> {
    const userSchema = UserItem.schema;
    return mongoose.model('User', userSchema);
  }

  public validate(user: UserItem): boolean {
    const { name, email } = config.get('validation.user');
    const userSchema = {
      name: Joi.string().min(name.min).max(name.max).required(),
      email: Joi.string().min(email.min).max(email.max).required(),
      type: Joi.any().required(),
    }
    return Joi.validate(user, userSchema);
  }

  public get object() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
      type: this._type,
      materials: this._materials,
      words: this._words,
      phrases: this.phrases
    }
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  public get type(): UserTypeItem {
    return this._type;
  }

  public set type(value: UserTypeItem) {
    this._type = value;
  }

  public get materials(): string[] {
    return this._materials;
  }

  public set materials(value: string[]) {
    this._materials = value;
  }

  public get words(): UserWordItem[] {
    return this._words;
  }

  public set words(value: UserWordItem[]) {
    this._words = value;
  }

  public get phrases(): UserPhraseItem[] {
    return this._phrases;
  }

  public set phrases(value: UserPhraseItem[]) {
    this._phrases = value;
  }
}